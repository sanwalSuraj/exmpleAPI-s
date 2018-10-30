import { NgModule } from '@angular/core';

import { AppSharedModule } from '../shared/app-shared.module';
import { CustomerRoutingModule } from './customer.routing';

import { CustomerComponent } from './customer.component';
import { FormComponent } from './form/form.component';
import { ListingComponent } from './listing/listing.component';
import { ImageUploadModule } from 'ng2-imageupload';


import { CustomerService } from "./customer.service";
import { NgxMaskModule } from 'ngx-mask'
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

@NgModule({
  imports: [
    AppSharedModule,
    ImageUploadModule,
    CustomerRoutingModule,
    NgxMaskModule.forRoot(),
    Ng4GeoautocompleteModule.forRoot()
  ],
  providers: [CustomerService],
  declarations: [CustomerComponent, FormComponent, ListingComponent]
})
export class CustomerModule { }
