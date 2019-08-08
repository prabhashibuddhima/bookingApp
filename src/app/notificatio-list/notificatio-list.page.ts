import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { Router,ActivatedRoute } from '@angular/router';
import { BoardroomService } from './../service/boardroom.service';

@Component({
  selector: 'app-notificatio-list',
  templateUrl: './notificatio-list.page.html',
  styleUrls: ['./notificatio-list.page.scss'],
})
export class NotificatioListPage implements OnInit {
  reqs: any;

  eventSource = [];
 
  constructor(private boardroomService: BoardroomService,private router: Router, private activatedRoute: ActivatedRoute,private alertController: AlertController,private plt: Platform, private localNotifications: LocalNotifications) {
    
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(uparams => {
      this.reqs = uparams;
    });


    let data = {
      "email": this.reqs.email
    }

    console.log(this.reqs.email);
    console.error();

    this.boardroomService.checkReq(data).then(async res => {
      let data = JSON.parse(res.data);
    

      this.eventSource = data.events;
      console.log(this.eventSource);
    }).catch(error => {
      console.log('server err');
    });
  }

 
 
 
 
 

}
