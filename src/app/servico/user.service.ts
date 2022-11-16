import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User{
  id: string;
  name: string;
  email: string;
  password: string;
}
export interface Login{
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost/php-api/users';
  private urlLogin = 'http://localhost/php-api/login';


  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<[User]>(this.url);
  }
  remove(id: any){
    return this.http.delete(this.url + '/' + id);
  }
  store(user: User){
    return this.http.post(this.url, user);
  }
  login(login: Login){
    return this.http.post<[User]>(this.urlLogin, login);
  }
}
