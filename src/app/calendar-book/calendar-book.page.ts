import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar-book',
  templateUrl: './calendar-book.page.html',
  styleUrls: ['./calendar-book.page.scss'],
})
export class CalendarBookPage implements OnInit {
  selectedBdRoom: any = {};
  bdName: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedBdRoom = params;
      
      
    });

    console.log(this.selectedBdRoom);
    if (this.selectedBdRoom.boardRoom == "1"){
      this.bdName = "Board Room 1";
    }else{
      this.bdName = "Board Room 2";
    }

    console.log(this.bdName);
   
  }

}
