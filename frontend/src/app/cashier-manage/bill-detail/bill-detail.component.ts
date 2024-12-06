import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderDish } from '../../models/order-dish.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderedDishesService } from '../../services/ordered-dishes.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { ResponseQrLink } from '../../models/rersponse-qr-link.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BankAccountService } from '../../services/bank-account.service';
import { ResponseCheckTransaction } from '../../models/response-check-transaction.model';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrl: './bill-detail.component.css',
})
export class BillDetailComponent implements OnInit {
  orderDishes: OrderDish[] = [];
  order: Order;
  groupedOrderDishes: OrderDish[] = [];
  user: User;
  qrLink: ResponseQrLink;
  responseCheckTransaction: ResponseCheckTransaction;

  // Variables to track radio button state
  payByCashChecked: boolean = false;
  qrPayChecked: boolean = false;

  returnMoney: number;
  text: string = '';

  isSuccess: boolean = false;

  // Default to true as per your HTML

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private orderedDishService: OrderedDishesService,
    private bankAccountService: BankAccountService,
    private accountService: AccountService,
    private cdr: ChangeDetectorRef
  ) {}

  paymentForm = new FormGroup({
    customerPay: new FormControl(null, [
      Validators.required,
      Validators['min'](0),
    ]),
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const orderId = +params.get('id');
      this.loadOrderDetail(orderId);
    });
  }

  loadOrderDetail(orderId: number): void {
    this.orderService.getOrderById(orderId).subscribe((order) => {
      this.order = order;
      if (this.order && this.order._links && this.order._links.orderDishes&&this.order._links.user) {
        this.loadOrderDish(this.order._links.orderDishes.href);
        this.loadUserCreateOrder(this.order._links.user.href);
      }
    });
  }

  loadOrderDish(orderDishUrl: string) {
    this.orderedDishService.getOrderDishes(orderDishUrl).subscribe((data) => {
      this.orderDishes = data;
      this.groupDishesByName(this.orderDishes);
    });
  }

  loadUserCreateOrder(userUrl: string){
    this.accountService.getUsersOfOrder(userUrl).subscribe((data) => {
      this.user=data;
    });

  }

  groupDishesByName(orderDishes: OrderDish[]): void {
    const grouped = orderDishes.reduce((acc, dish) => {
      const existing = acc.find((item) => item.nameOfDish === dish.nameOfDish);
      if (existing) {
        existing.quantity += dish.quantity;
      } else {
        acc.push({
          nameOfDish: dish.nameOfDish,
          quantity: dish.quantity,
          unitPrice: dish.unitPrice,
          imageUrl: dish.imageUrl,
        });
      }
      return acc;
    }, []);

    this.groupedOrderDishes = grouped;
  }

  calculateTotal(orderDish: OrderDish): number {
    var total = orderDish.quantity * orderDish.unitPrice;
    return total;
  }

  pay(): void {
    if (this.payByCashChecked) {
      this.order.payByCash = this.payByCashChecked;
      this.order.customerPay = this.getCustomerPayValue();
      this.order.returnMoney =
        this.getCustomerPayValue() - this.order.totalPrice;

      this.orderService.endOrderForPayByCash(this.order).subscribe(
        (response) => {
          alert('Success');
        },
        (error) => {
          console.error('Error updating order:', error);
        }
      );
      this.printBill();

      this.router.navigate(['/manage/unpaid-orders']);
    }
    if (this.qrPayChecked) {


      let intervalId = setInterval(() => {
        this.bankAccountService
          .checkQr(this.order.totalPrice, this.order.id)
          .subscribe(async (response) => {
            this.responseCheckTransaction = response;
           if (response.status == true) {
             clearInterval(intervalId);
             alert('Success');
             ;
           }
          });
      }, 5000);

    }
  }

  printBillAndNavigaeBacks(){
    this.printBill();
    this.router.navigate(['/manage/unpaid-orders']);
  }

  handleQrResponse(response: ResponseQrLink): void {
    console.log('Handling QR response:', response);
    this.qrLink = response;
    this.text = response.picturelink;
    console.log('Updated qrLink and text:', this.qrLink, this.text);
    if (this.qrLink && this.qrLink.picturelink) {
      this.cdr.detectChanges();
    }
  }



  calculateReturnMoney(): void {
    this.returnMoney = this.getCustomerPayValue() - this.order.totalPrice;
  }

  printBill(): void {
    const printContent = document.querySelector('.card-bill') as HTMLElement;
    if (printContent) {
      // Tạo bản sao của printContent để không ảnh hưởng đến DOM hiện tại
      const printClone = printContent.cloneNode(true) as HTMLElement;

      // Remove elements with .print-hidden class before printing
      const elementsToHide = printClone.querySelectorAll('.print-hidden');
      elementsToHide.forEach((element) => {
        element.remove();
      });

      const WindowPrt = window.open(
        '',
        '',
        'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
      );
      WindowPrt.document.write('<html><head><title>Print Bill</title>');
      WindowPrt.document.write('</head><body>');
      WindowPrt.document.write(printClone.outerHTML);
      WindowPrt.document.write('</body></html>');
      WindowPrt.document.close();
      WindowPrt.focus();
      setTimeout(() => {
        WindowPrt.print();
        WindowPrt.close();
      }, 500); // Wait 500ms to ensure content is fully loaded
    } else {
      console.error('Element .card-bill not found.');
    }
  }

  // Method to handle radio button click events
  onPayByCashClick(): void {
    this.payByCashChecked = true;
    this.qrPayChecked = false;
  }

  onQrPayClick(): void {
    this.payByCashChecked = false;
    this.qrPayChecked = true;
    console.log('QR Pay selected, calling bankAccountService.getQr');
    if (!this.isSuccess) {
      this.bankAccountService.getQr(this.order.totalPrice).subscribe(
        (response) => {
          console.log('Received response from getQr:', response);
          this.handleQrResponse(response);
          this.isSuccess = true;
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
    }

  }

  get f() {
    return this.paymentForm.controls;
  }

  getCustomerPayValue(): number {
    return this.f.customerPay.value;
  }
}
