import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../service/authentication.service';
import { BoardroomService } from './../service/boardroom.service';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  boardRoom: any;
  email: any;
  loggedUser: any = {};
  userEmail: any;
  userID: any;
  userFullName: any;
  reqUser: any;
  reqSTime: any;
  reqETime: any;
  reqBdRoom: any;
  noOfReqs: Number;


  constructor(private storage: Storage, private plt: Platform, private localNotifications: LocalNotifications, private boardroomService: BoardroomService, private router: Router, private activatedRoute: ActivatedRoute, private alertController: AlertController, private authService: AuthenticationService) {


    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.goNotifications();
        //this.showAlert(res.title, res.text, msg);
      });

      this.localNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        
        // this.showAlert(res.title, res.text, msg);
      });


    });


  }


  goNotifications() {
    
    let userparam = {
      "email": this.userEmail
    }

    console.log(userparam);
    this.router.navigate(['notificatio-list'], { queryParams: userparam });
  }

  showAlert(header, sub, msg) {
    this.alertController.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }

  pushNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Request Received!',
      text: 'Please Check the notifications!',
      data: { mydata: 'Check your notifications' },
      trigger: { every: ELocalNotificationTriggerUnit.SECOND },
      foreground: true // Show the notification while app is open
    });

  }

   ngOnInit() {

    console.log(this.noOfReqs);

    this.storage.get('email').then((val) => {

      this.userEmail = val;

    });

    this.storage.get('id').then((val) => {

      this.userID = val;
    });

    this.storage.get('fullname').then((val) => {

      this.userFullName = val;
    });

     this.getAuth();
     this.checkRequests();

  }

  ionViewWillEnter() {
    this.ngOnInit();


  }

  getAuth() {
    this.authService.getEmail().then((value) => {
      if (!value)
        this.authService.logoutAuthenticate();

      this.email = value;
    }).catch(error => {
      console.log(error);
      this.authService.logoutAuthenticate();
    });

    this.activatedRoute.queryParams.subscribe(uparams => {
      this.loggedUser = uparams;
    });

    //this.userEmail = this.loggedUser.email;
    //this.userID = this.loggedUser.id;
    //this.userFullName = this.loggedUser.username;


   
  }

  checkRequests() {
    let data = {
      "email": this.userEmail
    }
    this.boardroomService.checkReq(data).then(async res => {
      let data = JSON.parse(res.data);
      if (data.sno === 200) {
        if (this.noOfReqs == null) {
          this.noOfReqs = 0;
          this.pushNotification();
          
        } else {
          if (data.rlength > this.noOfReqs) {
            console.log('there r reqs');
            this.pushNotification();
            this.authService.requestsNumber(data.rlength);
  
            this.storage.get('rlength').then((val) => {
              this.noOfReqs = val;
  
  
            });
  
  
          } else if (data.rlength = this.noOfReqs) {
            console.log('equal reqs' + data.rlength);
  
  
          } else {
            console.log(data.rlength);
          }
  
        }
       



      } else if (data.sno === 404) {


      } else {
        console.log('server err1');

      }

    }).catch(error => {
      this.serverAlert();
    });

  }
  logout() {
    this.authService.logoutAuthenticate();
  }


  brSelect(brNumber: number) {
    if (brNumber == 1) {
      this.boardRoom = 1;
    } else if (brNumber == 2) {
      this.boardRoom = 2;
    } else {
      this.boardRoom = 3;
    }

  }

  goToBooking() {

    if (this.boardRoom == 1 || this.boardRoom == 2) {
      let param = {
        "boardRoom": this.boardRoom,
        "email": this.userEmail,
        "id": this.userID,
        "username": this.userFullName


      }
      this.router.navigate(['calendar-book'], { queryParams: param });
      console.log(param);
    }
    else {
      this.noBoardRoomAlert();
    }


  }


  async noBoardRoomAlert() {
    const alert = await this.alertController.create({
      header: 'No Selection!!',

      message: 'Please Select A Board Room!!',
      buttons: ['OK']
    });

    await alert.present();
  }


  async serverAlert() {
    const alert = await this.alertController.create({
      header: 'Something went wrong!',
      message: 'Please try again later',
      buttons: ['OK']
    });

    await alert.present();
  }


}
