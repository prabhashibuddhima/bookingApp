import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { BoardroomService } from './service/boardroom.service';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';


// import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  userEmail: any;
  noOfReqs: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private authenticationService: AuthenticationService,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    private storage: Storage,
    private localNotifications: LocalNotifications, 
    private boardroomService: BoardroomService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
   

    // private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.localNotifications.on('click').subscribe(res => {
      //   let msg = res.data ? res.data.mydata : '';
      //   this.goNotifications();
        
      // });

      // this.localNotifications.on('trigger').subscribe(res => {
      //   let msg = res.data ? res.data.mydata : '';

        
      // });



     
    });
  }

  // goNotifications() {

  //   let userparam = {
  //    "email": this.userEmail
  //   }

  //   console.log(userparam);
  //   this.router.navigate(['notificatio-list'], { queryParams: userparam });
  // }

  // pushNotification() {
  //   this.localNotifications.schedule({
  //     id: 1,
  //     title: 'Request Received!',
  //     text: 'Please Check the notifications!',
  //     data: { mydata: 'Check your notifications' },
  //     //trigger: { every: ELocalNotificationTriggerUnit.SECOND },
  //     foreground: true // Show the notification while app is open
  //   });

  // }


  // ionViewWillEnter(){

  //   this.storage.get('email').then((val) => {
  //     this.userEmail = val;


  //   });
  //   let that = this;

  //   let reqcheck = setInterval(() => {
  //    that.checkRequests();
  //   }, 1000);

  //   //this.checkRequests();
  
  // }
 
  // checkRequests() {

  //   if(this.userEmail != null){
  //     console.log(this.userEmail);
  //     let data = {
  //       "email": this.userEmail
  //     }
  //     this.boardroomService.checkReq(data).then(async res => {
  //       let data = JSON.parse(res.data);
  //       if (data.sno === 200) {
  //         if (this.noOfReqs == null) {
  //           this.noOfReqs = 0;
  //           //this.pushNotification();
  
  //         } else {
  //           if (data.rlength > this.noOfReqs) {
  //             console.log('there r reqs');
  //             this.pushNotification();
  //             this.authenticationService.requestsNumber(data.rlength);
  
  //             this.storage.get('rlength').then((val) => {
  //               this.noOfReqs = val;
  
  
  //             });
  
  
  //           } else if (data.rlength = this.noOfReqs) {
  //             console.log('equal reqs' + data.rlength);
  
  
  //           } else {
  //             console.log(data.rlength);
  //           }
  
  //         }
  
  
  
  
  //       } else if (data.sno === 404) {
  
  
  //       } else {
  //         console.log('server err1');
  
  //       }
  
  //     }).catch(error => {
  //       this.serverAlert();
  //     });
  //   }else{
  //     console.log('email is null')
  //   }
    

  // }

  

  // async serverAlert() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Something went wrong!',
  //     message: 'Please try again later',
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }


}
