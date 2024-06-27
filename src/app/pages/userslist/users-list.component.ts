import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, debounceTime, distinctUntilChanged, firstValueFrom, map, tap } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { User } from '../../shared/interfaces/models/user.interface';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UserslistComponent implements OnInit, AfterViewInit, OnDestroy {
  possibleNumbersOfUsers: number[] = [ 1, 2, 5, 10 ]
  displayedColumns: string[] = [ 'id', 'userName', 'email', 'currentUserBalance', 'phoneNumber', 'birthDate' ]

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService
  ) { }

  private _subscriptions: Subscription[] = [];

  filterForm: FormGroup = this._fb.group({
    numberOfUsers: this.possibleNumbersOfUsers[this.possibleNumbersOfUsers.length / 2],
    page: 0,
    valueContains: "",
    ascending: true,
    orderBy: this.displayedColumns[0]
  });
  usersList = new BehaviorSubject<User[]>([]);
  isLoadingUsers: boolean = true;

  ngOnInit() {
    this.subscribeToFormValueChanges();
  }

  ngAfterViewInit() {
    this.updateUsersList();
  }

  subscribeToFormValueChanges() {
    this._subscriptions.push(
      this.filterForm.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe(async values => {
        await this.updateUsersList();
      })
    );
  }

  nextPage(newPageNumber: number) {
    if(newPageNumber >= 0){
      this.filterForm.get('page')?.setValue(newPageNumber);
    }
  }

  async updateUsersList() {
    this.isLoadingUsers = true;

    let newUsersList = (await firstValueFrom(this._userService.getUsers(this.filterForm.value)))
      .map(user => this.setPlaceholderValues(user));

    this.usersList.next(newUsersList);
    this.isLoadingUsers = false;
  }

  private setPlaceholderValues(user: User): User{
    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      currentUserBalance: user.currentUserBalance ?? this.getRandomBalance(),
      phoneNumber: user.phoneNumber ?? '000-000-0000',
      birthDate: user.birthDate ?? this.getRandomDate()
    };
  }

  private getRandomBalance(min: number = 1000, max: number = 20000) {
    const randomDecimal = Math.random() * (max - min) + min;
    return Math.round(randomDecimal * 100) / 100;
  }

  private getRandomDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const randomTime = firstDay.getTime() + Math.random() * (lastDay.getTime() - firstDay.getTime());
    return new Date(randomTime);
}

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }
}
