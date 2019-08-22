import { Component, OnInit, ViewChild } from '@angular/core';
import { BoardroomService } from './../service/boardroom.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.page.html',
  styleUrls: ['./booking-list.page.scss'],
})

export class BookingListPage implements OnInit {

  selectedData: any = {};
  selectedBdNo: any;
  selectedTitle: any;
  selectedPerson: any;
  selectedDesc: any;
  selectedStartTime: any;
  selectedEndTime: any;
  reqUser: any;
  btnDisabled: any;
  minDate = new Date().toISOString();

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    currentMonth: new Date().getMonth(),

  };


  @ViewChild(CalendarComponent, { static: true }) myCal: CalendarComponent;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private alertCtrl: AlertController, private boardroomService: BoardroomService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(evparams => {
      this.selectedData = evparams;
    });
    //this.btnDisabled = true;
    //console.log(this.selectedData);
    this.selectedBdNo = this.selectedData.bdno;
    this.selectedTitle = this.selectedData.title;
    this.selectedPerson = this.selectedData.bookBy;
    this.selectedDesc = this.selectedData.description;
    this.selectedStartTime = this.selectedData.startTime;
    this.selectedEndTime = this.selectedData.endTime;
    this.reqUser = this.selectedData.trueUser;

    //console.log(this.reqUser);
    //console.log(this.selectedStartTime);

  }

  changeEvent() {

    console.log(this.calendar.currentDate);
    let sTime = new Date(this.selectedStartTime);
    let eTime = new Date(this.selectedEndTime);
    //this.calendar.currentDate = new Date();
    if ((this.selectedStartTime < this.calendar.currentDate) || (this.selectedStartTime > this.selectedEndTime)) {
      this.TimeValidateMsg();
    } else {
      console.log(sTime.getTime());
      let data = {
        "bdno": this.selectedBdNo,
        "title": this.selectedTitle,
        "person": this.selectedPerson,
        "description": this.selectedDesc,
        "startTime": sTime.getTime(),
        "endTime": eTime.getTime(),
        "email": this.selectedData.email,
        "id": this.selectedData.id

      }

      this.boardroomService.updateEvent(data).then(async res => {
        let data = JSON.parse(res.data);
        if (data.sno === 200) {

          console.log('updated');

          this.successMsg();
          this.router.navigate(['calendar-book']);




        } else {
          console.log('400');
          this.errorMsg();
          this.router.navigate(['calendar-book']);

        }

      }).catch(error => {
        //alert(JSON.stringify(error));
        console.log('server err');
        this.serverAlert();

      });
    }

  }

  deleteEvent() {

    let sTime = new Date(this.selectedStartTime);
    let eTime = new Date(this.selectedEndTime);

    let data = {
      "bdno": this.selectedBdNo,
      "title": this.selectedTitle,
      "person": this.selectedPerson,
      "description": this.selectedDesc,
      "startTime": sTime.getTime(),
      "endTime": eTime.getTime(),
      "email": this.selectedData.email,
      "id": this.selectedData.id

    }

    this.boardroomService.deleteEvent(data).then(async res => {
      let data = JSON.parse(res.data);
      if (data.sno === 200) {

        console.log('deleted');

        this.successDelete();
        this.router.navigate(['home']);




      } else {
        console.log('400');
        this.deleteErr();
        this.router.navigate(['calendar-book']);

      }

    }).catch(error => {
      //alert(JSON.stringify(error));
      console.log('server err');
      this.serverAlert();

    });



  }

  sendReq() {

    let data = {
      "bdno": this.selectedBdNo,
      "startTime": this.selectedStartTime,
      "endTime": this.selectedEndTime,
      "sender": this.selectedData.sender,
      "receiver": this.selectedData.receiver,



    }

    this.boardroomService.sendRequest(data).then(async res => {
      let data = JSON.parse(res.data);
      if (data.sno === 200) {

        console.log('gotcha');
        // await this.boardroomService.upload(r.id, 'profileImage', this.profileImageURI);

        this.btnDisabled = false;
        this.successReq();


      } else {
        console.log('400');
        this.alreadyReq();
      }

    }).catch(error => {
      //alert(JSON.stringify(error));
      console.log('server err');
      this.serverAlert();
    });


  }

  async successMsg() {
    const alert = await this.alertCtrl.create({
      // header: 'Done!',

      message: 'Event Successfully Updated!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorMsg() {
    const alert = await this.alertCtrl.create({
      // header: 'Done!',

      message: 'Update Failed! Try Again Later',
      buttons: ['OK']
    });

    await alert.present();
  }

  async serverAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Something went wrong!',
      message: 'Please try again later',
      buttons: ['OK']
    });

    await alert.present();
  }

  async successReq() {
    const alert = await this.alertCtrl.create({
      // header: 'Something went wrong!',
      message: 'Request Successfully Sent!',
      buttons: [{
        text: 'Ok',
        handler: () => {

          this.router.navigate(['calendar-book']);
        }
      }]
    });

    await alert.present();
  }

  async wrongReq() {
    const alert = await this.alertCtrl.create({

      message: 'Cannot Send the request!',
      buttons: [{
        text: 'Ok',
        handler: () => {

          this.router.navigate(['calendar-book']);
        }
      }]
    });

    await alert.present();
  }
  async TimeValidateMsg() {
    const alert = await this.alertCtrl.create({
      header: 'Wrong Time!',

      message: 'Time selection went wrong. Please do not select a past date or time !!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async successDelete() {
    const alert = await this.alertCtrl.create({
      // header: 'Something went wrong!',
      message: 'Event SuccessFully Deleted!',
      buttons: ['OK']
    });

    await alert.present();
  }


  async deleteErr() {
    const alert = await this.alertCtrl.create({

      message: 'You Can not Delete this Event!',
      buttons: ['OK']
    });

    await alert.present();
  }


  async alreadyReq() {
    const alert = await this.alertCtrl.create({

      message: 'You have already requested!',
      buttons: ['OK']
    });

    await alert.present();
  }



}
