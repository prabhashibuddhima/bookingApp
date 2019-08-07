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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private alertCtrl: AlertController,private boardroomService: BoardroomService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(evparams => {
      this.selectedData = evparams;
    });

    console.log(this.selectedData);
    this.selectedBdNo = this.selectedData.bdno;
    this.selectedTitle =this.selectedData.title;
    this.selectedPerson = this.selectedData.bookBy;
    this.selectedDesc = this. selectedData.description;
    this.selectedStartTime = this.selectedData.startTime;
    this.selectedEndTime = this.selectedData.endTime;


    

  }


}
