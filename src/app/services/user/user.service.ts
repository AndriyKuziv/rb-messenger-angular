import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { filterUsersRequest } from '../../shared/interfaces/requests/filter-users-request.interface';
import { User } from '../../shared/interfaces/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = environment.apiUrl + "/users/";

  constructor(private http: HttpClient) { }

  getUsers(filterUsersRequest: filterUsersRequest): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<User[]>(this.apiUrl + 'usersList', filterUsersRequest, { headers: headers });
  }
}
