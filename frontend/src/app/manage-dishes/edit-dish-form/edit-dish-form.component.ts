import { Dish } from './../../models/dish.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from '../../services/dish.service';

@Component({
  selector: 'app-edit-dish-form',
  templateUrl: './edit-dish-form.component.html',
  styleUrl: './edit-dish-form.component.css',
})
export class EditDishFormComponent implements OnInit {
  id;
  dish: Dish=null;
  typeOfDishData: String[] = [
    'Appetizers',
    'Desserts',
    'Drinks',
    'Hotpot',
    'Entrees',
    'Meat',
    'Side Dishes',
    'Salads',
    'Soups',
    'Sandwiches And Burgers',
    'Vegetables',
  ];
  newDishForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    typeOfDish: new FormControl('', [Validators.required]),
    dishImageUrl: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
      ),
    ]),
    specification: new FormControl(''),
  });



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dishService: DishService
  ) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
    console.log(this.dish);
  }

   handleProductDetails() {

    // get the "id" param string. convert string to a number using the "+" symbol
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.dishService.getDish(this.id).subscribe(
      data => {
        this.dish = data;
      }
    );

  }

  get name() {
    return this.newDishForm.get('name');
  }

  get price() {
    return this.newDishForm.get('price');
  }

  get typeOfDish() {
    return this.newDishForm.get('typeOfDish');
  }

  get dishImageUrl() {
    return this.newDishForm.get('dishImageUrl');
  }

  get specification() {
    return this.newDishForm.get('specification');
  }

  save(dish) {
    console.log(dish);
    this.dishService.updateDish(dish,this.id).subscribe({
      next: (response) => {
        alert(`Success update: ${response.name}`);
      },
      error: (err) => {
        alert(`error: ${err.message}`);
      },
    });
    this.router.navigate(['/manage/dishes']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.dishService.deleteDish(this.id).subscribe({
      next: (response) => {
        alert(`Delete Success: ${response.name}`);
      },
      error: (err) => {
        alert(`error: ${err.message}`);
      },
    });

    this.router.navigate(['/manage/dishes']);
  }
}
