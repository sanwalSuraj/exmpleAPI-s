import { EventEmitter } from '@angular/core';
import { constMessages } from './constant-messages';
export abstract class Listing extends constMessages {

  public searchTerm = '';
  public rowsOnPage = 5;
  public activePage = 1;
  public itemsTotal = null;
  public rowsInTable = [5, 10, 25];
  public sortBy = "firstName";
  public sortOrder = "asc";

  public isAdmin = localStorage.getItem('isAdmin') === 'true';
  public manageStaff = false;
  public manageOrders = false;
  public manageServices = false;

  LoggedUser: any = JSON.parse(localStorage.getItem('UserInfo'));


  item: any = null;
  items: any = [];
  tmpItems: any = [];


  USERTYPES: any = {
    1: "Super Admin",
    2: "Admin",
    3: "Sub Admin",
    4: "Customer"
  }

  STATUS: any = {
    confirm: "Confirmed",
    close: "Close",
    cancel: "Cancelled by User",
    pending: "Pending",
    suggestion_by_user: "Changed by User",
    suggestion_by_admin: "Changed by Staff"
  }
  selectedValue = 'Select Status';

  status = [
    { value: 'select_status', name: 'Select Status' },
    { value: 'pending', name: 'Pending' },
    // {value:'close',name:'Close'},
    { value: 'cancel', name: 'Cancelled' },
    { value: 'suggestion_by_user', name: 'Changed by User' },
    { value: 'suggestion_by_admin', name: 'Changed by Staff' }
  ];
  responseItems = [];
  busy: Promise<any>;

  public filterParams: any = {
    page: this.activePage,
    pageLimit: this.rowsOnPage,
    sortBy: this.sortBy,
    sortType: this.sortOrder,
    search: this.searchTerm
  };

  openModal(_item) {
    this.item = _item;
    //this.modalActions.emit({action:"modal",params:['open']});
  }

  changeStatus(status) {
    if (status == "select_status") {
      this.items = this.responseItems;
    } else {
      this.items = this.responseItems.filter(
        _item => _item.appointment_status.toLowerCase() == status.toLowerCase()
      );
    }

    this.tmpItems = this.items;
    this.itemsTotal = this.items.length;
  }

  formatStatus(status, status_by = 'user') {
    if (status === 'cancel')
      return status_by === 'admin' ? 'Cancelled by Admin' : 'Cancelled by User';
    else
      return this.STATUS[status];
  }
  closeModal() {
    //this.modalActions.emit({action:"modal",params:['close']});
  }

  public filterItems() {
    let reg = new RegExp('[a-zA-Z][a-zA-Z ]+');

    if ((this.searchTerm.length === 0 || this.searchTerm.length > 2)) {
      if (this.searchTerm.length > 2 && reg.test(this.searchTerm)) {
        if (this.tmpItems.length == 0)
          this.tmpItems = this.items;
        this.items = this.tmpItems.filter(_item => _item.name.toLowerCase().lastIndexOf(this.searchTerm.trim().toLowerCase()) != -1)
      }
      if (this.searchTerm.length === 0) {
        if (this.tmpItems.length == 0)
          this.tmpItems = this.items;
        this.items = this.tmpItems.filter(_item => _item.name.toLowerCase().lastIndexOf(this.searchTerm.trim().toLowerCase()) != -1)
      }
    }
  }

  public onPageChange(event) {
    this.rowsOnPage = event.rowsOnPage;
    this.activePage = event.activePage;
  }

  public searchEquipment(event) {
    // this.searchTerm = this.searchTerm.trimLeft();
    this.activePage = 1;
    this.filterItems();
  }

  public isAccessible() {
    return localStorage.getItem('isAdmin') === 'true'
  }


  objectSort(key, order = 'asc') {
    return function (a, b) {
      if (!a.hasOwnProperty(key) ||
        !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ?
          (comparison * -1) : comparison
      );
    };
  }


  abstract getItems()
  abstract removeItem(_item)
  abstract toggleStatus(_item)
}
