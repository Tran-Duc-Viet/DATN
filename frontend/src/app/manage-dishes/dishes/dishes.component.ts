import { Component, ViewChild } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../models/dish.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.css',
})
export class DishesComponent {
  dishes: Dish[] = [];
  filteredDishes: Dish[];
  displayedColumns: string[] = [
    'index',
    'imageUrl',
    'name',
    'typeOfDish',
    'price',
    'specification',
    'edit',
  ];
  dataSource: MatTableDataSource<Dish>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dishService: DishService) {}

  ngOnInit() {
    this.listDishes();
  }
  listDishes() {
    this.dataSource = new MatTableDataSource<Dish>([]);
    this.dishService.getDishesList().subscribe((data) => {
      this.dishes = data;
      this.dataSource = new MatTableDataSource(this.dishes);
      this.dataSource.paginator = this.paginator;
    });
  }

  getHighlights(highlights: string) {
    if (highlights) {
      const regex = /\n/g;
      let rt = highlights;
      return rt.replace(regex, '<br>');
    }
    return '';
  }

  filter(query: string) {
    if (query) {
      this.dishService.searchDishes(query).subscribe(
        (data) => {
          this.filteredDishes = data;
          this.updateDataSource();
        },
        (error) => {
          console.error('Error during search:', error);
        }
      );
    } else {
      this.filteredDishes = this.dishes;
      this.updateDataSource();
    }
  }

  private updateDataSource() {
    this.dataSource = new MatTableDataSource<Dish>(this.filteredDishes || []);
    this.dataSource.paginator = this.paginator;
  }
}
