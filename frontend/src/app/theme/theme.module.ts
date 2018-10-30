
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomFormsModule } from 'ng2-validation';

import { ThemeRoutingModule } from './theme.routing';


import { ThemeService } from "./theme.service";
import { ThemeComponent } from './theme.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';


import { AppSharedModule } from '../shared/app-shared.module';
import {BusyModule} from 'angular2-busy';
@NgModule({
  imports: [  
   BusyModule,
    CustomFormsModule,
    AppSharedModule,  
    ThemeRoutingModule   
    
  ],
  providers: [ThemeService],
  declarations: [ThemeComponent, HeaderComponent,FooterComponent, SidebarComponent]
})
export class ThemeModule { }
