import { NgModule, Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import {BaseService} from "../services/base-service";
import { NotificationsService } from '../shared/notifications.service';

@Injectable()
export class StaffService extends BaseService {
  constructor(
    private _router: Router,
    public http: Http,
    public notificationsService: NotificationsService) {
      super(http, notificationsService, 'admin',_router);
  }

  getHeader(language) {
    const headers = new Headers({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return new RequestOptions({ headers: headers });
  }

  userCheckin(id, language, url) {
    const headers = new Headers({'user_id': id, 'admin_url':'staff',  name:localStorage.getItem('name'), 'userID': localStorage.getItem('userID'), language: language, 'Authorization':`Bearer ${localStorage.getItem('token')}`});
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url.get('api') + url, options)
                    .toPromise().then(response => response.json())
                    .catch(data => this.handleError(data));
  }



  staffLoginByAdmin(obj, language, suffix = null) {
    return this.http.post(this.getUrl(suffix), obj, this.getHeader(language))
                    .toPromise().then(response => response.json())
                    .catch(data => this.handleError(data));
  }

  
}
