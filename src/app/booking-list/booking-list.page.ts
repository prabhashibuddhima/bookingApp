import { Component, OnInit } from '@angular/core';
import { BoardroomService } from './../service/boardroom.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


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


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private alertCtrl: AlertController, private boardroomService: BoardroomService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(evparams => {
      this.selectedData = evparams;
    });
    //this.btnDisabled = true;
    console.log(this.selectedData);
    this.selectedBdNo = this.selectedData.bdno;
    this.selectedTitle = this.selectedData.title;
    this.selectedPerson = this.selectedData.bookBy;
    this.selectedDesc = this.selectedData.description;
    this.selectedStartTime = this.selectedData.startTime;
    this.selectedEndTime = this.selectedData.endTime;
    this.reqUser = this.selectedData.trueUser;

    console.log(this.reqUser);
    console.log(this.selectedStartTime);

  }

  changeEvent() {

    console.log(this.selectedStartTime);
    let sTime = new Date(this.selectedStartTime);
    let eTime =  new Date(this.selectedEndTime);
    console.log(sTime.getTime());
    let data = {
      "bdno": this.selectedBdNo,
      "title": this.selectedTitle,
      "person": this.selectedPerson,
      "description": this.selectedDesc,
      "startTime": sTime.getTime(),
      "endTime": eTime.getTime(),
      "email": this.selectedData.email ,
      "id": this.selectedData.id

    }

    this.boardroomService.updateEvent(data).then(async res => {
      let data = JSON.parse(res.data);
      if (data.sno === 200) {

        console.log('updated');
        // await this.boardroomService.upload(r.id, 'profileImage', this.profileImageURI);
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
    });


  }

  deleteEvent() {

    let sTime = new Date(this.selectedStartTime);
    let eTime =  new Date(this.selectedEndTime);
    
    let data = {
      "bdno": this.selectedBdNo,
      "title": this.selectedTitle,
      "person": this.selectedPerson,
      "description": this.selectedDesc,
      "startTime": sTime.getTime(),
      "endTime": eTime.getTime(),
      "email": this.selectedData.email ,
      "id": this.selectedData.id

    }

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



      } else {
        console.log('400');

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
}
