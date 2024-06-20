import { Component, AfterViewInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable, map, pipe } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { User } from '../../shared/models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.css'
})
export class UserslistComponent implements AfterViewInit {
  possibleNumbersOfUsers: number[] = [ 1, 2, 5, 10 ]
  displayedColumns: string[] = [ 'id', 'userName', 'email', 'phoneNumber' ]

  private _users = new BehaviorSubject<User[]>([]);
  dataSource$: Observable<User[]> = this._users.asObservable();

  constructor(private _userService: UserService) { }

  @ViewChild('nextButton', { read: ElementRef }) nextButton!: ElementRef<HTMLButtonElement>;

  @Input() numberOfUsers: number = this.possibleNumbersOfUsers[this.possibleNumbersOfUsers.length / 2];
  @Output() numberOfUsersChange = new EventEmitter<number>();

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
    this._userService.getUsers(this.numberOfUsers, this.currentPage,
      this.valueContains, this.ascending, this.orderBy)?.subscribe(
        data => {
          if (data.length > 0){
            this._users.next(data);

            if (this.nextButton.nativeElement && this.nextButton.nativeElement.disabled){
              this.dataSource$.subscribe(users => {
                this.nextButton.nativeElement.disabled = users.length < this.numberOfUsers;
              });
            }
          }
          else{
            if(this.nextButton.nativeElement){
              this.nextButton.nativeElement.disabled = true;

              this.currentPage--;
              this.currentPageChange.emit(this.currentPage);
            }
            else{
              console.error("Button for next page is null or undefined");
            }
          }
          console.log(data);
      });
  }
}
