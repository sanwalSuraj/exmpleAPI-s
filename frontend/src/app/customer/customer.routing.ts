import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { FormComponent } from './form/form.component';
import { ListingComponent } from './listing/listing.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    data: { title: 'Customer' },
    children: [
      { path: '', component: ListingComponent, data: { title: '' } },
      { path: 'new', component: FormComponent, data: { title: 'New' } },
      { path: ':id/edit', component: FormComponent, data: { title: 'Edit' } }
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerRoutingModule { }
