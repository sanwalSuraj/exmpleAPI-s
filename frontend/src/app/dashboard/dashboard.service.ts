import { NgModule, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService  {
	rootUrl: string =   environment.config.BASE_URL;
    baseUrl: string =   environment.config.API_URL;
  constructor(
    private _router: Router,
    public http: Http
   ) {
     
  }

  search(str:any,url=null) {
    if(url==null){
       return this.http.get(`${this.baseUrl}planets/?search=${str}`)
                    .toPromise().then((res: Response) => res.json());
                  }else{
                     return this.http.get(url)
                    .toPromise().then((res: Response) => res.json());
                  }
   
  }
}
