import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute, Params, Route } from '@angular/router';
import { Listing } from '../../shared/listing';
import { environment } from '../../../environments/environment';
import { StaffService } from "../staff.service";
import { NotificationsService } from '../../shared/notifications.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import * as $ from "jquery";
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent extends Listing implements OnInit {
  popupImagePath: string;
  language: any;
  public url = environment.HOST + environment.IMAGE_URL;
  private _host = environment.HOST;
  public itemsTotal = 100;
  public usercomment = ''
  public currentUserStatusId = '';
  public confirmMsg = ''
  public isStatusModalShown = false;
  public status;
  public isModalShown: boolean = false;
  public isLoading: boolean = false;
  public isConfirmModalShow: boolean = false;
  public previousComment = '';
  @ViewChild('autoStatusShownModal') public autoStatusShownModal: ModalDirective;
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  public successModal: ModalDirective;

  @ViewChild('autoConfirmShowModal') public autoConfirmShowModal: ModalDirective;
  constructor(
    private klassService: StaffService,
    private notificationsService: NotificationsService,
    private _router: Router,
    private toastr: ToastrService
  ) { super(); }

  ngOnInit() {
    this.language = 'en';
    this.getUsersList();
    this.notificationsService.updateBreadCrumbs([{ lable: 'Staff Members', url: `/planets/?search=""` }]);

    //this.isAdmin = localStorage.getItem('isAdmin') === 'true';


  }

  zoomImagehide() {
    const myContainer = <HTMLElement>document.querySelector("image-zoom-container");
    // myContainer.style.display = 'none';
  }
  zoomImageshow() {
    // let myContainer = <HTMLElement>document.querySelector("image-zoom-container");
    // myContainer.style.display = 'block';
  }

  public filterItems1() {
    // let reg = new RegExp('[a-zA-Z][a-zA-Z ]+');

    // if ((this.searchTerm.length === 0 || this.searchTerm.length > 2)) {
    //   if(this.searchTerm.length > 2  && reg.test(this.searchTerm)){ 
    //     if(this.tmpItems.length == 0)
    //     this.tmpItems = this.items;
    //   this.items = this.tmpItems.filter(_item => _item.firstName.toLowerCase().lastIndexOf(this.searchTerm.trim().toLowerCase()) != -1    )

    //   console.log(this.items)
    //   }
    //   if(this.searchTerm.length === 0){
    //     if(this.tmpItems.length == 0)
    //     this.tmpItems = this.items;
    //   this.items = this.tmpItems.filter(_item => _item.firstName.toLowerCase().lastIndexOf(this.searchTerm.trim().toLowerCase()) != -1 )
    //   }
    // }
    let reg = new RegExp('[a-zA-Z][a-zA-Z ]+');
    if ((this.searchTerm.length === 0 || this.searchTerm.length > 2)) {
      if (this.searchTerm.length > 2 && reg.test(this.searchTerm)) {
        this.filterParams.page = 1;
        this.filterParams.search = this.searchTerm;
        this.getUsersList();

      }
      if (this.searchTerm.length === 0) {
        this.filterParams.page = 1;
        this.filterParams.search = this.searchTerm;
        this.getUsersList();
      }

    }
  }


  viewImage(path) {
    debugger;
    this.popupImagePath = 'assets/img/no-image-available.jpg';
    setTimeout(() => {
      this.popupImagePath = path;
    }, 1);
    // this.isImageModalShown = true;
    // this.successModal.show();
  }

  public searchEquipment(event) {
    // this.searchTerm = this.searchTerm.trimLeft();
    this.activePage = 1;
    this.filterItems1();
  }

  onSortOrder(e) {
    this.filterParams.sortBy = this.sortBy
    this.filterParams.sortType = e
    this.getUsersList();
  }



  getUsersList() {
    debugger;
    this.busy = this.klassService.getUserList(this.filterParams, this.language, 'userList').then((res) => {
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
    this.getUsersList();
  }

  removeItem(item) {


    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this staff!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {


        let obj = { _id: item._id }
        this.busy = this.klassService.removeItem(obj, this.language, 'admin/delete').then((res) => {
          if (!res)
            return true;

          this.item = null;
          this.getItems();
          this.notificationsService.notify('success', this.constantMessages.staffDeleted);

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


  public showModal(): void {
    this.isModalShown = true;
  }
  public onPreviousHidden(): void {
    this.isModalShown = false;
  }
  public hidePreviousmodal(): void {
    this.autoShownModal.hide();
  }
  public ShowConfirmModal(): void {
    this.hidePreviousmodal();
    this.isConfirmModalShow = true;
  }
  public onConfirmModalHidden(): void {
    this.isConfirmModalShow = false;
  }
  public hideConfirmModal(): void {
    this.autoConfirmShowModal.hide();
  }
  public showStatusModal(): void {
    this.hideConfirmModal()
    this.isStatusModalShown = true;
  }
  public onStatusHidden(): void {
    this.isStatusModalShown = false;
    // this.usercomment = '';
  }
  public hideStatusModal(): void {
    this.autoStatusShownModal.hide();
  }


  changeStatus(user, event) {
    debugger;
    this.isLoading = false;
    this.currentUserStatusId = user._id;
    if (event.target.checked) {
      this.confirmMsg = 'Do you want to activate seller?';
      this.isConfirmModalShow = true;
    } else {
      this.confirmMsg = 'Do you want to deactivate seller?';
      this.isConfirmModalShow = true;
      this.isStatusModalShown = false;


    }
    this.status = event;
    event.target.checked = !event.target.checked;
  }

  onSubmit(value) {
    debugger;
    this.isLoading = true;
    const field = {
      id: this.currentUserStatusId,
      isAdminApproved: !this.status.target.checked,
      comment: value.comment,
    }
    this.klassService.updateAdminApproved(field, this.language, 'updateAdminApproved/').then(res => {
      debugger;
      this.autoStatusShownModal.hide();
      if (res.success) {
        var alertmsg = ''
        if (!this.status.target.checked) {
          this.notificationsService.notify('success', 'User has been activated successfully');
        } else {
          this.notificationsService.notify('success', 'User has been deactivated successfully');
        }
        this.isLoading = false;
        this.status.target.checked = !this.status.target.checked;
      } else {
        this.isLoading = false;
      }
      this.getUsersList();
    }, err => {
      this.autoStatusShownModal.hide();
      this.isLoading = false;
    });
  }
  // toggleStatus(item) {
  //   let obj = { _id: item._id, status: item.status }
  //   this.busy = this.klassService.toggleStatus(obj, this.language, 'admin/changeStatus').then((res) => {
  //     if (!res)
  //       return true;

  //     this.notificationsService.notify('success', this.constantMessages.staffStatus);
  //   });
  // }



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
