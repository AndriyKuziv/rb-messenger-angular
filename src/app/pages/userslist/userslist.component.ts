import { CommonModule, NgIf } from '@angular/common';
import { Component, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService, User } from '../../services/user/user.service';
import { MatDividerModule } from '@angular/material/divider'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [
    MatTableModule, MatPaginatorModule, MatDividerModule, MatButtonModule,
    MatCardModule, MatDialogModule, MatSelectModule, MatOptionModule, MatFormFieldModule,
    MatLabel, MatInputModule, MatCheckboxModule, CommonModule, NgIf, FormsModule
  ],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.css'
})
export class UserslistComponent implements AfterViewInit {
  constructor(private userService: UserService) { }

  ngAfterViewInit() {
    this.updateUsersList();
  }

  private prevButton = document.getElementById('prev-button');
  private nextButton = document.getElementById('next-button');

  private users = new BehaviorSubject<User[]>([]);
  dataSource$: Observable<User[]> = this.users.asObservable();

  possibleNumbersOfUsers: number[] = [ 1, 2, 5, 10 ]
  displayedColumns: string[] = [ 'id', 'userName', 'email' ]

  @Input() currentNumberOfUsers: number = this.possibleNumbersOfUsers[this.possibleNumbersOfUsers.length / 2];
  @Output() currentNumberOfUsersChange = new EventEmitter<number>();

  @Input() currentPage: number = 0;
  @Output() currentPageChange = new EventEmitter<number>();

  @Input() valueContains: string = "";
  @Output() valueContainsChange = new EventEmitter<string>();

  @Input() orderBy: string = this.displayedColumns[0];
  @Output() orderByChange = new EventEmitter<string>();

  @Input() ascending: boolean = true;
  @Output() ascendingChange = new EventEmitter<boolean>();


  nextPage(){
    this.currentPage = this.currentPage + 1;
    this.currentPageChange.emit(this.currentPage);

    this.updateUsersList();

    console.log("Current currentPage: " + this.currentPage.toString());
  }

  previousPage(){
    if (this.currentPage > 0){
      this.currentPage = this.currentPage - 1;
    }
    this.currentPageChange.emit(this.currentPage);

    this.updateUsersList();

    console.log("Current currentPage: " + this.currentPage.toString());
  }

  setAscending(ascending: boolean){
    this.ascending = ascending;
    this.ascendingChange.emit(this.ascending);

    console.log("Current ascending: " + this.ascending);
  }

  updateUsersList(){
    console.log("Calling api...");
    this.userService.getUsers(this.currentNumberOfUsers, this.currentPage,
      this.valueContains, this.ascending, this.orderBy)?.subscribe(
        data => {
          this.users.next(data);
          console.log(data);
        }
      );
  }


}
