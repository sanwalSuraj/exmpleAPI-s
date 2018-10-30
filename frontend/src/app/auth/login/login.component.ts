import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';
import { RouterModule } from '@angular/router';
import { LoginService } from './login.service';

import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  busy: Promise<any>;
  public user = { username: "", password: "" };
  public msg = '';
  public isForgotPassword: boolean = false;
  public emailNew: string;
  userEmail: string = '';
  constructor(
    private _service: LoginService,
    private _router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    localStorage.clear();

  }

  forgotPassword(n = 0) {
    if (n == 0) {
      $("#loginform").slideUp();
      $("#recoverform").fadeIn();
    } else {

      $("#recoverform").hide();
      $("#loginform").fadeIn();
    }
  }

  login() {
    this.busy = this._service.login(this.user).then(
      (res: any) => {
        debugger;
        let data = res;
        if (res.status == "200") {
          console.log("jsdhkjahdkj", data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('UserInfo', JSON.stringify(data));
          this._router.navigate(['/users']);
        } else {
          this.toastr.error('you are not able to login. Please try later.');
          this._router.navigate(['/login']);

        }
      },
    );
  }


  sendEmail() {
    this.busy = this._service.forgetPassword(this.userEmail).then(
      (res: any) => {
        this.toastr.success("Reset password link has been sent to your registered email");
      },
      (error) => {
        if (error.headers._headers.get('content-type')[0] == "application/json; charset=utf-8") {
          this.toastr.error(error.json().msg);
        } else {
          this.toastr.error('Unable reset your password. Please try later.');
        }
      }
    );
  }

}
