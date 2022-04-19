import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.apiUrl + 'api/account/';
  private currenUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currenUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currenUserSource.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currenUserSource.next(null);
  }

  setCurrentUser(user: User) {
    this.currenUserSource.next(user);
  }
}
