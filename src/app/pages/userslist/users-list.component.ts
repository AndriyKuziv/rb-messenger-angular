import { Component, AfterViewInit, ViewChild, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { User } from '../../shared/models/user';
import { UserService } from '../../services/user/user.service';
import { filterUsersRequest } from '../../shared/models/requests/filterUsersRequest';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UserslistComponent implements OnInit, AfterViewInit {
  possibleNumbersOfUsers: number[] = [ 1, 2, 5, 10 ]
  displayedColumns: string[] = [ 'id', 'userName', 'email', 'phoneNumber' ]

  filterForm!: FormGroup;
  usersList = new BehaviorSubject<User[]>([]);
  isLoadingUsers: boolean = true;

  constructor(private fb: FormBuilder, private _userService: UserService) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
        numberOfUsers: this.possibleNumbersOfUsers[this.possibleNumbersOfUsers.length / 2],
        page: 0,
        valueContains: "",
        ascending: true,
        orderBy: this.displayedColumns[0]
    });

    this.filterForm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(values => {
      this.updateUsersList();
    });
  }

  ngAfterViewInit() {
    this.updateUsersList();
  }

  nextPage(newPageNumber: number) {
    if(newPageNumber >= 0){
      this.filterForm.get('page')?.setValue(newPageNumber);
    }
  }

  updateUsersList(){
    console.log("Updating users list...");
    this.isLoadingUsers = true;
    this._userService.getUsers(this.filterForm.value)?.subscribe(
        data => {
          this.usersList.next(data);

          this.isLoadingUsers = false;
      });
  }
}
