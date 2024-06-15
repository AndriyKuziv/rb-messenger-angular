import { Component, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService, User } from '../../services/user/user.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.css'
})
export class UserslistComponent implements AfterViewInit {
  constructor(private userService: UserService) { }

  ngAfterViewInit() {
    this.updateUsersList();
  }

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
