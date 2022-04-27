import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.apiUrl + 'api/account/';
  private currenUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currenUserSource.asObservable();

  key = CryptoJS.enc.Utf8.parse("yU8Fx0PKYbA14yDO90vtsDfpoYNKF7Rn");
  iv = CryptoJS.enc.Utf8.parse("qx5idVRpf8ZI49WH");

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

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

  loggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      var validityPeriod = new Date(user.validityPeriod);
      var currentTime = new Date();
      var timeToExpiry = new Date(validityPeriod.getTime() - (1000 * 60) * 10); //10 mins

      // if (currentTime < validityPeriod) {
      //   //Within 10 minutes of expiry, call refreshLogin() to acquire new token.
      //   if (currentTime > timeToExpiry) {
      //     var formdata = new FormData();
      //     formdata.append("Username", user.username);
      //     formdata.append("Password", ".");
      //     // this.refreshLogin(formdata).subscribe();
      //   }

      return true;
      // }
      // else {
      //   this.toastr.info("Your session has timed out, please log in again.", "Session expired", {
      //     progressBar: true,
      //     timeOut: 0,
      //     extendedTimeOut: 1500
      //   });
      //   localStorage.removeItem('user');
      //   return false;
      // }      
    }
    else
      return false;
  }

  encrypt(plainText) {
    var encrypted = CryptoJS.AES.encrypt(plainText, this.key,
      {
        iv: this.iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
      }).toString();
    return encrypted;
  }

  decrypt(plainText) {
    var decrypted = CryptoJS.AES.decrypt(plainText, this.key, {
      iv: this.iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
