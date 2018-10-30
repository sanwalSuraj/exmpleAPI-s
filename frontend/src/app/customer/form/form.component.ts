import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { CustomerService } from "../customer.service";
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
    private klassService: CustomerService,
    // private rolesService: RolesService,
    private notificationsService: NotificationsService
  ) { super(); }

  ngOnInit() {

    this.item.companyId = this.LoggedUser.companyId;
    this.item.storeId = this.LoggedUser.storeId;
    this.item.address = {};
    this.item.createdBy = this.LoggedUser.id;
    this.item.creatorType = this.LoggedUser.userType;

    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      this.itemID = params['id'];
      if (this.itemID) {
        this.isEditable = true;
        this.getItem();
      } else {
        this.item.userType = 4;
      }

    });
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
    this.busy = this.klassService.getItem(this.itemID, this.language, "getData").then((res) => {
      if (!res) {
        this.router.navigate([`/shopitems`]);
        return true;
      }

      this.item = res.data;
    });
  }


  createItem() {
    this.busy = this.klassService.addItem(this.item, this.language, "createitem").then((res) => {
      if (!res)
        return true;

      this.item = res.data;
      this.router.navigate(['/shopitems']);
      this.notificationsService.notify('success', "Items Successfully Saved");
    });
  }

  updateItem() {
    this.busy = this.klassService.updateItem(this.itemID, this.item, this.language, 'editItem').then((res) => {
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


}
