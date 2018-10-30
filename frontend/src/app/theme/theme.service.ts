import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


@Injectable()
export class ThemeService{

  constructor(
    private _router: Router,
    public http: Http
    ) {
     
  }
 
}
