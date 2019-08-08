import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../service/authentication.service';
import { BoardroomService } from './../service/boardroom.service';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  boardRoom: any;
  email: any;
  // br1value: any;
  // br2value: any;

  loggedUser: any = {};
  userEmail: any;
  userID: any;
  userFullName: any;
  reqUser: any;
  reqSTime: any;
  reqETime: any;
  reqBdRoom:any;

  constructor(private plt: Platform, private localNotifications: LocalNotifications,private boardroomService: BoardroomService,private router: Router, private activatedRoute: ActivatedRoute,private alertController: AlertController,private authService: AuthenticationService) {
    
   
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


  goNotifications(){
    let userparam = {
      "email": this.userEmail
    }
    
    
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
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE },
      foreground: true // Show the notification while app is open
    });

  }

   ngOnInit(){
    this.authService.getEmail().then((value) => {
      if(!value)
        this.authService.logoutAuthenticate();

      this.email = value;
    }).catch(error => {
      console.log(error);
      this.authService.logoutAuthenticate();
    });

     this.activatedRoute.queryParams.subscribe(uparams => {
      this.loggedUser = uparams;
    });

    this.userEmail = this.loggedUser.email;
    this.userID = this.loggedUser.id;
    this.userFullName = this.loggedUser.username;

    console.log( this.loggedUser.username);
    this.checkRequests();
    
  }

  ionViewWillEnter(){
    this.authService.getEmail().then((value) => {
      if(!value)
        this.authService.logoutAuthenticate();

      this.email = value;
    }).catch(error => {
      console.log(error);
      this.authService.logoutAuthenticate();
    });

     this.activatedRoute.queryParams.subscribe(uparams => {
      this.loggedUser = uparams;
    });

    this.userEmail = this.loggedUser.email;
    this.userID = this.loggedUser.id;
    this.userFullName = this.loggedUser.username;

    console.log( this.userEmail);
    this.checkRequests();
    
  }

  checkRequests(){
    let data = {
      "email": this.userEmail
    }
    this.boardroomService.checkReq(data).then(async res => {
      let data = JSON.parse(res.data);
      if (data.sno === 200) {
      
        console.log('reqs');
        this.pushNotification();

      } else if(data.sno === 404){
        console.log('no reqs');
        
      }else{
        console.log('server err1');
       
      }
     
    }).catch(error => {
      this.serverAlert();
    });

  }
  logout() {
    this.authService.logoutAuthenticate();
  }


  brSelect(brNumber: number){
    if(brNumber==1){
      this.boardRoom = 1;
    }else if(brNumber==2){
      this.boardRoom = 2;
    }else{
      this.boardRoom=3;
    }
    console.log(this.boardRoom);
  }

  goToBooking(){

    if(this.boardRoom==1 || this.boardRoom == 2){
      let param = {
        "boardRoom": this.boardRoom,
        "email": this.userEmail,
        "id": this.userID,
        "username" : this.loggedUser.username
       
        
      }
      this.router.navigate(['calendar-book'], { queryParams: param });
      console.log(param);
    }
    else{
      this.noBoardRoomAlert();
    }
   

  }


  async noBoardRoomAlert(){
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
