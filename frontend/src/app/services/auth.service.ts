import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { BaseService } from './base-service';

@Injectable()
export class AuthService {
  redirectUrl: string;
  isLoggedIn: boolean = false;

  constructor(private http: Http) { }

  login(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }
}
