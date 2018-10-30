import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { StaffService } from "../staff.service";
//import { RolesService } from "../../roles/roles.service";
import { NotificationsService } from '../../shared/notifications.service';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { DatePickerOptions } from '../../shared/date-picker-options';
import { BaseForm } from '../../shared/base-form';

@Component({
  selector: 'app-form',
  providers: [],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends BaseForm implements OnInit {
  roles: any;
  userType: any = "";
  phone_number: '';
  confirmPassword: any = "";
  datePickerOptions = DatePickerOptions;
  language: any;
  launguages: any;
  disableAdmin: any = false;
  userSettings = {
    "showRecentSearch": false,
    "geoCountryRestriction": ["us"],
    "searchIconUrl": "http://downloadicons.net/sites/default/files/identification-search-magnifying-glass-icon-73159.png"
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private klassService: StaffService,
    // private rolesService: RolesService,
    private notificationsService: NotificationsService
  ) { super(); }

  ngOnInit() {

    this.item.companyId = this.LoggedUser.companyId;
    this.item.storeId = this.LoggedUser.storeId;

    this.item.createdBy = this.LoggedUser.id;
    this.item.creatorType = this.LoggedUser.userType;
    this.item.role = 'users';
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      this.itemID = params['id'];
      if (this.itemID) {
        this.isEditable = true;
        this.getItem();
      } else {
        this.item.userType = 3;
      }

    });
    this.getRoles();
    this.language = 'en';

    if (this.itemID == null) {
      this.notificationsService.updateBreadCrumbs([{ lable: 'Staff Members', url: `/staff` }, { lable: 'Add', url: `/staff/new` }]);
    } else {
      this.notificationsService.updateBreadCrumbs([{ lable: 'Staff Members', url: `/staff` }, { lable: 'Edit', url: `/staff/${this.itemID}/edit` }]);
    }
  }

  autoCompleteCallback1(selectedData: any) {
    //do any necessery stuff.
    console.log(selectedData)
    if (selectedData.response == true) {
      this.item.address = selectedData.data.formatted_address;

      selectedData.data.address_components.forEach((item) => {

        if (item.types.indexOf('postal_code') > -1) {
          this.item.postalCode = item.long_name;
        }
        if (item.types.indexOf('country') > -1) {
          this.item.country = item.long_name;
        }
        if (item.types.indexOf('administrative_area_level_1') > -1) {
          this.item.state = item.long_name;
        }
        if (item.types.indexOf('locality') > -1) {
          this.item.city = item.long_name;
        }

      })



    } else {
      this.item.address = "";
      this.item.postalCode = "";
      this.item.country = "";
      this.item.state = "";
      this.item.city = "";
    }

  }


  getItem() {
    console.log("dkjsahfkjsa", this.itemID)
    this.busy = this.klassService.getItem(this.itemID, this.language, "getData").then((res) => {
      if (!res) {
        this.router.navigate([`/users`]);
        return true;
      }

      this.item = res.data;
      // if(this.item.hasOwnProperty('role')){
      //     if(this.item.role.role === 'Super Admin'){
      //       this.disableAdmin = true;
      //     }
      // }

    });
  }
  // save(){
  //   console.log(this.user)
  // }

  getRoles() {
    this.roles = [];
    let filters = { "page": "1", "count": "100", "sort": "created_date" };

    this.roles = [{ value: 2, name: 'Admin' },
    { value: 3, name: 'Sub Admin' }

    ];
    // this.busy = this.rolesService.getItems(this.language, 'roles').then((res) => {
    //   if(!res)
    //     return true;

    //   this.roles = res.data;
    //   // this.roleID = this.roles[0]._id;
    //   this.item.role_name = this.roles[0].role;

    //   if(this.itemID) {
    //     this.getItem();
    //   }
    // });
  }


  createItem() {
    console.log("sdlkjadjklas", this.item);
    this.busy = this.klassService.addItem(this.item, this.language, "CreateUser").then((res) => {

      if (!res)
        return true;

      this.item = res.data;
      this.router.navigate(['/users']);
      this.notificationsService.notify('success', this.constantMessages.staffCreated);
    });
  }

  updateItem() {
    this.busy = this.klassService.updateItem(this.itemID, this.item, this.language, 'editProfile').then((res) => {
      if (!res)
        return true;
      this.item.password = "";
      this.confirmPassword = "";

      this.form.form.markAsPristine();
      this.notificationsService.notify('success', this.constantMessages.customerUpdated);
    },
      (error) => {
        console.log("herererrer", error.json())
        this.notificationsService.notify('error', error.json().message);

      });
  }
  updateRoleName(event) {
    // this.item.role_name = event.target['options'][event.target['options'].selectedIndex].text;
    // this.item.role = this.roles.filter(role=> role._id === this.roleID)[0];
    // let role =this.roles.filter(role=> role._id === this.roleID)
    this.markDirty();
  }
}
