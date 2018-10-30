import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile.routing';
import { AppSharedModule } from '../shared/app-shared.module';

import { ProfileService } from "./profile.service";
import { StaffService } from "./../staff/staff.service";

import {CurrencyPipe} from '@angular/common'
declare var require: any;
 import {NgxMaskModule} from 'ngx-mask'
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
@NgModule({
  imports: [AppSharedModule,
    ProfileRoutingModule,
     NgxMaskModule.forRoot(),
	Ng4GeoautocompleteModule.forRoot()
  ],
  exports: [],
  declarations: [ProfileComponent],
  providers: [ProfileService,StaffService, CurrencyPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule {
}
