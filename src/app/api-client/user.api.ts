import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalVariable} from '../global';

const USER_API = `${GlobalVariable.ROOT_URL}api/user/`;

@Injectable({
  providedIn: 'root'
})
export class UserApi {

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${USER_API}${id}`);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(USER_API);
  }

  updateUser(user: any): Observable<any> {
    return this.http.post(`${USER_API}update`, user);
  }
}
