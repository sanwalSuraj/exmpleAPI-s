import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { ThemeService } from '../theme.service';

import * as moment from 'moment';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  providers: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {
  
  constructor(
  
  ) { }

  ngOnInit() {
   

  }
sidebarMini(){
	 $("body").toggleClass('mini-sidebar');
	 $(".full-logo").toggleClass('hide');
}

}
