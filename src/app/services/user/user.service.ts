import { filterUsersRequest } from '../../shared/models/requests/filterUsersRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = environment.apiUrl + "/users/";

  constructor(private http: HttpClient) { }

  getUsers(filterUsersRequest: filterUsersRequest): Observable<User[]> | null {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<User[]>(this.apiUrl + 'usersList', filterUsersRequest, { headers: headers });
  }
}
