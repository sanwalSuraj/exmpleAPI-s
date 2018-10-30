import { ViewChild } from '@angular/core';
import { constMessages } from './constant-messages';
import * as moment from 'moment';
export abstract class BaseForm extends constMessages {
  itemID = null;
  item: any = {};
  isEditable: boolean = false;
  busy: Promise<any>;
  public isAdmin = localStorage.getItem('isAdmin') === 'true';

  LoggedUser: any = JSON.parse(localStorage.getItem('UserInfo'));

  launguages = [
    { 'name': 'English', 'id': 'en' },
    { 'name': 'Spanish', 'id': 'es' },
    { 'name': 'Portuguese', 'id': 'pt' },
    { 'name': 'Russian', 'id': 'ru' }

  ];
  STATUS: any = {
    confirm: "Confirmed",
    cancel: "Cancelled",
    pending: "Pending",
    suggestion_by_user: "Changed by User",
    suggestion_by_admin: "Changed by Staff"
  }

  @ViewChild('mainForm') form;

  save() {
    if (this.itemID)
      this.updateItem();
    else
      this.createItem();
  }

  markDirty() {
    this.form.form.markAsDirty();
    this.form.form.markAsTouched();
  }

  onCountryChange(e) {
    if (e.dialCode != undefined)
      this.item.country_code = "+" + e.dialCode;
    this.markDirty();
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

  formatDate(dateTime, time = false) {
    if (dateTime) {
      let date = dateTime.split('T')[0];
      if (time) {
        let time = dateTime.split('T')[1];
        return moment(date).format('MM/DD/YYYY') + ' ' + moment(time, ["HH:mm:ss"]).format("hh:mm A");
      } else {
        return moment(date).format('MM/DD/YYYY')
      }
    }
  }

  formatDateTS(dateTime, time = false) {
    if (dateTime) {
      let date = dateTime.split('T')[0];
      if (time) {
        let time = dateTime.split('T')[1];
        return moment(date).format('MM/DD/YYYY') + ' ' + moment(time, ["HH:mm:ss"]).format("hh:mm A");
      } else {
        return moment(date).format('YYYY-MM-DD')
      }
    }
  }

  public isAccessible() {
    return localStorage.getItem('isAdmin') === 'true'
  }
  abstract getItem();
  abstract createItem();
  abstract updateItem();
}
