import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { ThemeService } from '../theme.service';

import * as moment from 'moment';

@Component({
  selector: 'app-footer',
  providers: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  implements OnInit {
   year:Number;

  constructor(
  
  ) { }

  ngOnInit() {
   let  d = new Date();
    this.year = d.getFullYear();

  }


}
