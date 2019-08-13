import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
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
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private authenticationService: AuthenticationService,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    private localNotifications: LocalNotifications, 
    private authService: AuthenticationService,
    private boardroomService: BoardroomService
    // private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {
        this.localNotifications.on('click').subscribe(res => {
          let msg = res.data ? res.data.mydata : '';
          this.goNotifications();
          //this.showAlert(res.title, res.text, msg);
        });
  
        this.localNotifications.on('trigger').subscribe(res => {
          let msg = res.data ? res.data.mydata : '';
          
          // this.showAlert(res.title, res.text, msg);
        });
  
      }
    });
  }

  goNotifications() {
    
   
    

   
    
  }
 
  
}
