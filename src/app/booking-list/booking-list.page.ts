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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private alertCtrl: AlertController,private boardroomService: BoardroomService) { }

  ngOnInit() {

  }


  getAllData(){

  // this.boardroomService.getList();
    
  }

}
