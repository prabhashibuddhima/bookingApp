import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../service/authentication.service';

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private alertController: AlertController,private authService: AuthenticationService) {
    
  }

  
//  async ngOnInit() {
//     this.authService.getEmail().then((value) => {
//       if(!value)
//         this.authService.logoutAuthenticate();

//       this.email = value;
//     }).catch(error => {
//       console.log(error);
//       this.authService.logoutAuthenticate();
//     });

//     await this.activatedRoute.queryParams.subscribe(uparams => {
//       this.loggedUser = uparams;
//     });

//     this.userEmail = this.loggedUser.email;
//     this.userID = this.loggedUser.id;

//     console.log( this.loggedUser);

//   }

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

    console.log( this.loggedUser.username);

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


}
