import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";


import { CommonService} from '../../services/common.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-sidebar',
  providers: [],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  
private subscription: Subscription;
User:any = JSON.parse(localStorage.getItem('UserInfo'));
  constructor( private commonService: CommonService
  ) { }

  ngOnInit() {
    

        this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
    
              if (res.hasOwnProperty('option') && res.option === 'profile-update' &&  res.value !=undefined) {

                this.User=JSON.parse(res.value);
              }
            })

        var url = window.location;
    var element = $('ul#sidebarnav a').filter(function () {
        return this.href == url;
    }).addClass('active').parent().addClass('active');
    while (true) {
        if (element.is('li')) {
            element = element.parent().addClass('in').parent().addClass('active').children('a').addClass('active');
            
        }
        else {
            break; 
        }
    }
    $('#sidebarnav a').on('click', function (e) {
        
            if (!$(this).hasClass("active")) {
                // hide any open menus and remove all other classes
                $("ul", $(this).parents("ul:first")).removeClass("in");
                $("a", $(this).parents("ul:first")).removeClass("active");
                
                // open our new menu and add the open class
                $(this).next("ul").addClass("in");
                $(this).addClass("active");
                
            }
            else if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).parents("ul:first").removeClass("active");
                $(this).next("ul").removeClass("in");
            }
    })
    $('#sidebarnav >li >a.has-arrow').on('click', function (e) {
        e.preventDefault();
    });
  }

  



}
