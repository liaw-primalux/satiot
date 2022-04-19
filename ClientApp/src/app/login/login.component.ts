import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  httpLoading = false;
  model: User;
  errorMsg: string;

  constructor(
    public loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.model = new User();
  }

  login() {
    this.errorMsg = null;
    this.httpLoading = true;
    this.loginService.login(this.model).subscribe(response => {

    },
      (error: HttpErrorResponse) => {
        if (error.status == 401)
          this.errorMsg = error.error;
        else
          this.toastr.error(error.error, "System error..", { closeButton: true, progressBar: true, timeOut: 0, extendedTimeOut: 1500 });
      }
    ).add(() => {
      this.httpLoading = false;
    })
  }
}
