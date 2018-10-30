import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params, Route } from '@angular/router';
import { Listing } from '../../shared/listing';
import { ImageResult } from 'ng2-imageupload';
import { CustomerService } from "../customer.service";
import { NotificationsService } from '../../shared/notifications.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import * as $ from "jquery";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent extends Listing implements OnInit {
  language: any;
  public itemsTotal = 100;
  constructor(
    private klassService: CustomerService,
    private notificationsService: NotificationsService,
    private _router: Router,
    private toastr: ToastrService
  ) { super(); }

  ngOnInit() {
    this.language = 'en';
    this.getShopList();
    this.notificationsService.updateBreadCrumbs([{ lable: 'Customers ', url: `/planets/?search=""` }]);

    //this.isAdmin = localStorage.getItem('isAdmin') === 'true';


  }

  public filterItems1() {

    let reg = new RegExp('[a-zA-Z][a-zA-Z ]+');
    if ((this.searchTerm.length === 0 || this.searchTerm.length > 2)) {
      if (this.searchTerm.length > 2 && reg.test(this.searchTerm)) {
        this.filterParams.page = 1;
        this.filterParams.search = this.searchTerm;
        this.getShopList();

      }
      if (this.searchTerm.length === 0) {
        this.filterParams.page = 1;
        this.filterParams.search = this.searchTerm;
        this.getShopList();
      }

    }
  }

  public searchEquipment(event) {
    // this.searchTerm = this.searchTerm.trimLeft();
    this.activePage = 1;
    this.getShopList();
  }

  onSortOrder(e) {
    this.filterParams.sortBy = this.sortBy
    this.filterParams.sortType = e
    this.getShopList();
  }



  getShopList() {
    debugger;
    this.busy = this.klassService.getShopList(this.filterParams, this.language, 'itemList').then((res) => {
      if (!res)
        return true;
      console.log("=====>", res)
      this.items = res.data;
      console.log("hdsfgsfh", this.items);
    });
  }

  public onPageChange(event) {
    this.filterParams.pageLimit = event.rowsOnPage;
    this.filterParams.page = event.activePage;
    this.getShopList();
  }

  removeItem(item) {


    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this customer!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {


        let obj = { _id: item._id }
        this.busy = this.klassService.removeItem(obj, this.language, 'customer/delete').then((res) => {
          if (!res)
            return true;

          this.item = null;
          this.getShopList();
          this.notificationsService.notify('success', this.constantMessages.customerDeleted);

        });

        // Swal(
        //       'Deleted!',
        //       'Your staff has been deleted.',
        //       'success'
        //     )

        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      }
    })


  }

  toggleStatus(item) {
    let obj = { _id: item._id, status: item.status }
    this.busy = this.klassService.toggleStatus(obj, this.language, 'customer/changeStatus').then((res) => {
      if (!res)
        return true;

      this.notificationsService.notify('success', this.constantMessages.customerStatus);
    });
  }



  public filterItems() {
    if (this.searchTerm.length === 0 || this.searchTerm.length > 2) {
      if (this.tmpItems.length == 0)
        this.tmpItems = this.items;
      this.items = this.tmpItems.filter(_item =>
        _item.name.toLowerCase().lastIndexOf(this.searchTerm.trim().toLowerCase()) != -1 ||
        _item.email.toLowerCase().lastIndexOf(this.searchTerm.trim().toLowerCase()) != -1 ||
        _item.mobile_number.toLowerCase().lastIndexOf(this.searchTerm.trim().toLowerCase()) != -1
      );
    }
  }
}
