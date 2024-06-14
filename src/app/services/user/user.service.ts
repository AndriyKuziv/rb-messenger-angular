import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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

export interface User {
  id: number;
  userName: string;
  email: string;
}
