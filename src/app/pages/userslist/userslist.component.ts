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
  possibleNumbersOfUsers: number[] = [ 1, 2, 5, 10 ]
  displayedColumns: string[] = [ 'id', 'userName', 'email' ]

  private _users = new BehaviorSubject<User[]>([]);
  dataSource$: Observable<User[]> = this._users.asObservable();

  constructor(private _userService: UserService) { }

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

  ngAfterViewInit() {
    this.updateUsersList();
  }

  nextPage(){
    if (this._users.getValue.length < this.currentNumberOfUsers){
      return;
    }

    this.currentPage++;
    this.currentPageChange.emit(this.currentPage);

    this.updateUsersList();
  }

  previousPage(){
    if (this.currentPage <= 0){
      return;
    }

    this.currentPage--;
    this.currentPageChange.emit(this.currentPage);

    this.updateUsersList();
  }

  setAscending(ascending: boolean){
    this.ascending = ascending;
    this.ascendingChange.emit(this.ascending);
  }

  updateUsersList(){
    console.log("Updating list of users...");
    this._userService.getUsers(this.currentNumberOfUsers, this.currentPage,
      this.valueContains, this.ascending, this.orderBy)?.subscribe(
        data => {
          this._users.next(data);
          console.log(data);
        }
      );
  }
}
