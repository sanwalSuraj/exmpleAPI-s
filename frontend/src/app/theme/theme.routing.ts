import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThemeComponent } from './theme.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'profile/:tab',
        loadChildren: 'app/profile/profile.module#ProfileModule'
      },
      {
        path: 'users',
        loadChildren: 'app/staff/staff.module#StaffModule'
      },
      {
        path: 'shopitems',
        loadChildren: 'app/customer/customer.module#CustomerModule'
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ThemeRoutingModule { }
