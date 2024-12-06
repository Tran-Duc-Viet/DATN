import { Component, ViewChild } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DishService } from '../../services/dish.service';
import { OrderDishInfor } from '../../models/order-dish-infor.model';
import { OrderedDishesService } from '../../services/ordered-dishes.service';

@Component({
  selector: 'app-ordered-dishes',
  templateUrl: './ordered-dishes.component.html',
  styleUrl: './ordered-dishes.component.css',
})
export class OrderedDishesComponent {
  orderDishes: OrderDishInfor[] = [];
  processingDishes: OrderDishInfor[] = [];
  preparingDishes: OrderDishInfor[] = [];

  displayedColumns: string[] = [
    'index',
    'imageUrl',
    'name',
    'tableNum',
    'quantity',
    'notice',
    'status',
    'edit',
  ];

  processingDataSource: MatTableDataSource<OrderDishInfor>;
  preparingDataSource: MatTableDataSource<OrderDishInfor>;

  @ViewChild('processingPaginator') processingPaginator: MatPaginator;
  @ViewChild('servingPaginator') preparingPaginator: MatPaginator;

  constructor(
    private orderedDishesService: OrderedDishesService
  ) {}

  ngOnInit() {
    this.listDishes();
  }

  listDishes() {
    this.orderedDishesService.getOrderedDishesList().subscribe((data) => {
      this.orderDishes = data;
      this.processingDishes = this.orderDishes.filter(
        (dish) => dish.status === 'Processing'
      );
      this.preparingDishes = this.orderDishes.filter(
        (dish) => dish.status === 'Preparing'
      );

      this.processingDataSource = new MatTableDataSource<OrderDishInfor>(
        this.processingDishes
      );
      this.processingDataSource.paginator = this.processingPaginator;

      this.preparingDataSource = new MatTableDataSource<OrderDishInfor>(
        this.preparingDishes
      );
      this.preparingDataSource.paginator = this.preparingPaginator;
    });
  }

  changeStatus(element: OrderDishInfor) {
    if (element.status == 'Processing') {
      this.orderedDishesService.updateOrderDish(element, 'Preparing').subscribe(
        (response) => {
          console.log('Dish updated successfully:', response);
          // Handle success, if needed
          this.listDishes(); //
        },
        (error) => {
          console.error('Error updating dish:', error);
          // Handle error, if needed
        }
      );
    }
    if (element.status == 'Preparing') {
      this.orderedDishesService.updateOrderDish(element, 'Serving').subscribe(
        (response) => {
          console.log('Dish updated successfully:', response);
          // Handle success, if needed
          this.listDishes(); //
        },
        (error) => {
          console.error('Error updating dish:', error);
          // Handle error, if needed
        }
      );
    }
  }

  getHighlights(highlights: string) {
    if (highlights == 'null') {
      return 'No Notice';
    }
    if (highlights == '') {
      return 'No Notice';
    }
    if (highlights) {
      const regex = /\n/g;
      let rt = highlights;
      return rt.replace(regex, '<br>');
    }
    return 'No Notice';
  }

  // filter(query: string) {
  //   if (query) {
  //     this.dishService.searchDishes(query).subscribe(
  //       (data) => {
  //         this.filteredDishes = data;
  //         this.updateDataSource();
  //       },
  //       (error) => {
  //         console.error('Error during search:', error);
  //       }
  //     );
  //   } else {
  //     this.filteredDishes = this.dishes;
  //     this.updateDataSource();
  //   }
  // }

  // private updateDataSource() {
  //   this.dataSource = new MatTableDataSource<Dish>(this.filteredDishes || []);
  //   this.dataSource.paginator = this.paginator;
  // }
}
