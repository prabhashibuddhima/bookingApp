import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { Router, ActivatedRoute } from '@angular/router';
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

  reqread: any;
  eventSource = [];
  reqarray = [];

  constructor(private storage: Storage, private boardroomService: BoardroomService, private router: Router, private activatedRoute: ActivatedRoute, private alertController: AlertController, private plt: Platform, private localNotifications: LocalNotifications) {

  }

  ngOnInit() {


  }


  ionViewWillEnter() {

    this.activatedRoute.queryParams.subscribe(uparams => {
      this.reqs = uparams;
      this.email = this.reqs.email;


      let data = {
        "email": this.email
      }


      console.error();

      this.boardroomService.checkReq(data).then(async res => {
        let data = JSON.parse(res.data);
        let eventarray = data.events;
        eventarray.reverse();
        eventarray.forEach(element => {
          this.eventSource.push(element);
          this.reqarray.push(element.reqid);
        });
        console.log(this.reqarray);
        this.updateReqs();
      }).catch(error => {
        console.log('server err');
      });
    });




  }

  updateReqs() {

    this.reqread = 1;
    let data = {
      reqid: this.reqarray,
      readreq: this.reqread
    }
  console.log(data);
    this.boardroomService.readRequest(data);
    // let data = JSON.parse(res.data);
    // if (data.sno === 200) {

    //   console.log('read');


    // } else {

    //   console.log('Cannot read');
    // }





  }







}
