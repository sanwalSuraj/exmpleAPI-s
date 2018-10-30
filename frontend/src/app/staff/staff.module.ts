import { NgModule } from '@angular/core';

import { AppSharedModule } from '../shared/app-shared.module';
import { StaffRoutingModule } from './staff.routing';

import { StaffComponent } from './staff.component';
import { FormComponent } from './form/form.component';
import { ListingComponent } from './listing/listing.component';
import { ModalModule } from 'ngx-bootstrap';

import { StaffService } from "./staff.service";
import { ImageZoomModule } from 'angular2-image-zoom';
import { NgxMaskModule } from 'ngx-mask'
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

@NgModule({
  imports: [
    AppSharedModule,
    StaffRoutingModule,
    ImageZoomModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    Ng4GeoautocompleteModule.forRoot()
  ],
  providers: [StaffService],
  declarations: [StaffComponent, FormComponent, ListingComponent]
})
export class StaffModule { }
