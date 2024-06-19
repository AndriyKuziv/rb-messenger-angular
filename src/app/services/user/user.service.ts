import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://rb-messenger.azurewebsites.net/users/';

  constructor(private http: HttpClient) { }

  getUsers(numberOfUsers: number, page: number, valueContains: string,
    ascending: boolean, orderBy: string): Observable<User[]> | null {
    const token = localStorage.getItem('token');
    if(token === null || token === undefined){
      console.error('Error! Token does not exist.');
      return null;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      numberOfUsers: numberOfUsers,
      page: page,
      valueContains: valueContains,
      ascending: ascending,
      orderBy: orderBy
    };

    return this.http.post<User[]>(this.apiUrl + 'usersList', body, { headers: headers });
  }
}
