import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Platform, AlertController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { BoardroomService } from './service/boardroom.service';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';
import { timer } from 'rxjs/observable/timer';
import { Network } from '@ionic-native/network/ngx';
import { NetworkService } from './service/network.service';

// import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  userEmail: any;
  noOfReqs: any;
  showSplash = true;

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
    public network: Network,
    public networkService: NetworkService,
    public events: Events,
   

    // private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false);

      // Offline event
      this.events.subscribe('network:offline', () => {
        alert('network:offline ==> ' + this.network.type);
      });


      // Online event
      this.events.subscribe('network:online', () => {
        alert('network:online ==> ' + this.network.type);
      });


     
    });
  }




}
