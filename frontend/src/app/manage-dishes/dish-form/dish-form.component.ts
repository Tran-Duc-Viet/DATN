import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DishService } from '../../services/dish.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.css',
})
export class DishFormComponent {
  typeOfDishData: String[] = [
    'Appetizers',
    'Desserts',
    'Drink',
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

  data: any;
  companyNames$;
  storage$;

  constructor(private router: Router, private dishService: DishService) {}

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
    this.dishService.saveNewDishes(dish).subscribe({
      next: (response) => {
        alert(`Success create: ${response.name}`);
      },
      error: (err) => {
        alert(`error: ${err.message}`);
      },
    });
    this.router.navigate(['/manage/dishes']);
  }


}
