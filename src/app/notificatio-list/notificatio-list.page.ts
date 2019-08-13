import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { Router,ActivatedRoute } from '@angular/router';
import { BoardroomService } from './../service/boardroom.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-notificatio-list',
  templateUrl: './notificatio-list.page.html',
  styleUrls: ['./notificatio-list.page.scss'],
})
export class NotificatioListPage implements OnInit {
  reqs: any = {};
  email: any;

  eventSource = [];
 
  constructor(private storage: Storage,private boardroomService: BoardroomService,private router: Router, private activatedRoute: ActivatedRoute,private alertController: AlertController,private plt: Platform, private localNotifications: LocalNotifications) {
    
  }

  ngOnInit() {

    
  }
  

  ionViewWillEnter(){

    this.activatedRoute.queryParams.subscribe(uparams => {
      this.reqs = uparams;
      this.email = this.reqs.email

      let data = {
        "email": this.email
      }
  
      console.log(this.reqs.email);
      console.error();
  
     this.boardroomService.checkReq(data).then(async res => {
        let data = JSON.parse(res.data);
    
        data.events.forEach(element => {
          this.eventSource.push(element);
        });

        console.log(this.eventSource);
      }).catch(error => {
        console.log('server err');
      });
    });
   
  }

 
 
 
 
 

}
