import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';


import { BusyModule } from 'angular2-busy';
import { ToastrModule } from 'ngx-toastr';
import { ImagePopupComponent } from './image-popup/image-popup.component';


import { NG2DataTableModule } from "angular2-datatable-pagination";


import { SocketService } from './socket.service';
import { NotificationsService } from './notifications.service';
import { NotificationsComponent } from "./notifications.component";
import { CustomFormsModule } from 'ng2-validation'

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
//import { Ng2TelInputModule } from 'ng2-tel-input';
import { Ng2FileTypeModule } from 'ng2-file-type';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
  ],
  exports: [
    HttpModule,
    BusyModule,
    ModalModule,
    FormsModule,
    CustomFormsModule,
    CommonModule,
    ImagePopupComponent,
    NG2DataTableModule,
    // Ng2TelInputModule,
    // NgxIntlTelInputModule,
    BsDropdownModule,
    NotificationsComponent,
    Ng2FileTypeModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NotificationsService, SocketService],
  declarations: [NotificationsComponent, ImagePopupComponent]
})
export class AppSharedModule { }
