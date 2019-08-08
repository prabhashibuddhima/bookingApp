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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private alertCtrl: AlertController, private boardroomService: BoardroomService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(evparams => {
      this.selectedData = evparams;
    });

    console.log(this.selectedData);
    this.selectedBdNo = this.selectedData.bdno;
    this.selectedTitle = this.selectedData.title;
    this.selectedPerson = this.selectedData.bookBy;
    this.selectedDesc = this.selectedData.description;
    this.selectedStartTime = this.selectedData.startTime;
    this.selectedEndTime = this.selectedData.endTime;
    this.reqUser = this.selectedData.trueUser;

    console.log(this.reqUser);


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



       

      }  else {
        console.log('400');
       
      }
      
    }).catch(error => {
      //alert(JSON.stringify(error));
      console.log('server err');
    });

  }

}
