import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  boardRoom: any;
  // br1value: any;
  // br2value: any;


  constructor(private router: Router, private alertController: AlertController) {
    
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
        "boardRoom": this.boardRoom
       
        
      }
      this.router.navigate(['calendar-book'], { queryParams: param });
      //console.log(param);
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
