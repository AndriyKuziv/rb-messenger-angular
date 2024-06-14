import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService, User } from '../../services/user/user.service';
import { MatDividerModule } from '@angular/material/divider'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatDividerModule, MatButtonModule],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.css'
})
export class UserslistComponent implements AfterViewInit {
  private users = new BehaviorSubject<User[]>([]);

  constructor(private userService: UserService) { }

  displayedColumns: string[] = [ 'id', 'userName', 'email' ]
  currentPage: number = 0;

  dataSource: Observable<User[]> = this.users.asObservable();

  ngAfterViewInit() {
    console.log('initialized');

    this.filterUsers();
  }

  filterUsers(){
    this.userService.getUsers(2, 1, "" , true, "")?.subscribe(
      data => {
        this.users.next(data);
        console.log(data);
      }
    );
  }
}
