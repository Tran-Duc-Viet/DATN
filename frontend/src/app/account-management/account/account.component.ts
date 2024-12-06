import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'], // Sửa lại `styleUrl` thành `styleUrls`
})
export class AccountComponent {
  users: User[] = [];
  filteredUsers: User[];
  displayedColumns: string[] = [
    'index',
    'userName',
    'encryptedPassword',
    'role',
    'update',
    'delete',
  ];

  roleOptions: string[] = ['ADMIN', 'CASHIER', 'STAFF', 'KITCHEN_SUPERVISOR'];
  dataSource: MatTableDataSource<User>;

  selectedRole: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.listDishes();
  }
  listDishes() {
    this.dataSource = new MatTableDataSource<User>([]);
    this.accountService.getUsersList().subscribe((data) => {
      this.users = data.filter(user => user.active==true);
      this.dataSource = new MatTableDataSource(this.users.slice(1));
      this.dataSource.paginator = this.paginator;
      this.paginator.pageIndex=1;
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

  updateRole(element: User) {
    this.accountService.updateUserRole(element).subscribe((response) => {
      console.log(response);
    });
  }

  deleteUser(element: User){
    element.active=false;
    this.accountService.deleteUser(element).subscribe((response)=>{
      console.log(response);
      this.listDishes();
    })
  }

  filter(query: string) {
    if (query) {
      this.accountService.searchUsers(query).subscribe(
        (data) => {
          this.filteredUsers = data;
          this.updateDataSource();
        },
        (error) => {
          console.error('Error during search:', error);
        }
      );
    } else {
      this.filteredUsers = this.users;
      this.updateDataSource();
    }
  }

  private updateDataSource() {
    this.dataSource = new MatTableDataSource<User>(this.filteredUsers || []);
    this.dataSource.paginator = this.paginator;
  }
}
