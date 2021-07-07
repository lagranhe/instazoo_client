import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalVariable} from '../../global';

const AUTH_API = `${GlobalVariable.ROOT_URL}api/auth/`;

@Injectable({
  providedIn: 'root'
})
export class AuthApi {

  constructor(private http: HttpClient) { }

  public login(user): Observable<any> {
    return this.http.post(`${AUTH_API}signin`, {
      username: user.username,
      password: user.password
    });
  }

  public register(user): Observable<any> {
    return this.http.post(`${AUTH_API}signup`, {
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }
}
