import { Component, OnInit } from '@angular/core';

import { DashboardService } from "./dashboard.service";

import {CurrencyPipe} from '@angular/common'


import * as moment from 'moment';
import * as $ from 'jquery';
import {Observable} from "rxjs"
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 	busy: Promise<any>;
	searchStr:String="";
	result:any=[];
  next:any;
  previous:any;
  constructor(
    private currencyPipe: CurrencyPipe,
     private _service: DashboardService
  ) { }

  async ngOnInit() {

    // $.toast({
    //         heading: 'Welcome to Elite admin'
    //         , text: 'Use the predefined ones, or specify a custom position object.'
    //         , position: 'top-right'
    //         , loaderBg: '#ff6849'
    //         , icon: 'info'
    //         , hideAfter: 3500
    //         , stack: 6
    //     })

   }

 onKey(event: any) { // without type info 
    this.searchStr = event.target.value;//alert("here")
    this.search();

  }
search() { 
    this.busy = this._service.search(this.searchStr).then(
      (res: any) => {
        this.next=res.next,
        this.previous=res.previous;
        this.result = res.results;
      
        this.result.sort(function (a, b) {
        return  b.population-a.population ;
      });
      },
      (error) => {
        if(error.headers._headers.get('content-type')[0] == "application/json; charset=utf-8") {
          //this.toastr.error(error.json().msg);
        } else {
         // this.toastr.error('you are not able to login. Please try later.');
        }
      }
    );
  }

  more() { 
    this.busy = this._service.search(this.searchStr,this.next).then(
      (res: any) => {
        this.next=res.next;
         this.previous=res.previous;
        this.result = res.results;
      
        this.result.sort(function (a, b) {
        return  b.population-a.population ;
      });
      },
      (error) => {
        if(error.headers._headers.get('content-type')[0] == "application/json; charset=utf-8") {
          //this.toastr.error(error.json().msg);
        } else {
         // this.toastr.error('you are not able to login. Please try later.');
        }
      }
    );
  }

  setFont(index,length){ console.log(index,length)
    if(length<4)
    return ((length+1)-index)*10;

  if(length<8)
    return ((length+1)-index)*7;
  else
    return ((length+1)-index)*3;



  }
  

}

