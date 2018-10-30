import { Component, OnInit,ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { ProfileService } from "./profile.service";
import { StaffService } from "./../staff/staff.service";

import {CurrencyPipe} from '@angular/common'


import * as moment from 'moment';
import * as $ from 'jquery';
import {Observable} from "rxjs"

import { BaseForm } from '../shared/base-form';
import { ToastrService } from 'ngx-toastr';

import { CommonService} from '../services/common.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 	busy: Promise<any>;
  item:any={}; 
	LoggedUser:any = JSON.parse(localStorage.getItem('UserInfo'));
  language:String="en";
  tab;
   userSettings={
"showRecentSearch":false,
"geoCountryRestriction":["us"],
"searchIconUrl":"http://downloadicons.net/sites/default/files/identification-search-magnifying-glass-icon-73159.png"
};
@ViewChild('mainForm') form;
  constructor(
    private currencyPipe: CurrencyPipe,
     private _service: ProfileService,
     private klassService: StaffService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
       private toastr: ToastrService,
       private commonService: CommonService

  ) { }

  async ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
        this.tab = params['tab'];
        
        
      });
this.getItem();
   }

 
 getItem() {

   console.log(this.LoggedUser)

     this.busy = this.klassService.getItem(this.LoggedUser.id, this.language,"admin/getData").then((res) => {
      if(!res){
        this.router.navigate([`/`]);
        return true;
      }

      this.item = res.data;
      this.item.password = "";

      this.item.updatedBy=this.LoggedUser.id;
      this.item.updaterType=this.LoggedUser.userType;

      this.userSettings['inputString'] = this.item.address;
      this.userSettings = Object.assign({},this.userSettings)
    

    });
  }


   updateItem() {
   if(this.item.phoneHome!=undefined){
     this.item.phoneHome = this.item.phoneHome.replace(/\D+/g, '');
   }
    if(this.item.phoneMobile!=undefined){
     this.item.phoneMobile = this.item.phoneMobile.replace(/\D+/g, '');
   }
     if(this.item.phoneWork!=undefined){
     this.item.phoneWork = this.item.phoneWork.replace(/\D+/g, '');
   }

    
     this.busy = this.klassService.updateItem(this.LoggedUser.id, this.item, this.language, 'admin/edit').then((res) => {
      if(!res)
        return true;
     
       this.form.form.markAsPristine();
       this.toastr.success("Profile has been updated successfully");

       this.LoggedUser.firstName=this.item.firstName;
       this.LoggedUser.lastName=this.item.lastName;
       this.LoggedUser.address=this.item.address;
       this.LoggedUser.state=this.item.state;
       this.LoggedUser.city=this.item.city;
       this.LoggedUser.phoneHome=this.item.phoneHome;
       this.LoggedUser.phoneWork=this.item.phoneWork;
       this.LoggedUser.phoneMobile=this.item.phoneMobile;

       localStorage.setItem('UserInfo', JSON.stringify(this.LoggedUser));
         this.commonService.notifyOther({option: 'profile-update',value:JSON.stringify(this.LoggedUser)});
      

    },
      (error) => {
        console.log("herererrer",error.json())
           this.toastr.error(error.json().message);
       
      });
  }


  autoCompleteCallback1(selectedData:any) {
        //do any necessery stuff.
        console.log(selectedData)
        if(selectedData.response==true){
          this.item.address=selectedData.data.formatted_address;

          selectedData.data.address_components.forEach((item)=>{

            if(item.types.indexOf('postal_code')>-1){
              this.item.postalCode=item.long_name;
            }
            if(item.types.indexOf('country')>-1){
              this.item.country=item.long_name;
            }
            if(item.types.indexOf('administrative_area_level_1')>-1){
              this.item.state=item.long_name;
            }
            if(item.types.indexOf('locality')>-1){
              this.item.city=item.long_name;
            }

          })



        }else{
           this.item.address="";
           this.item.postalCode="";
           this.item.country="";
           this.item.state="";
           this.item.city="";
        }
        
    }


}

