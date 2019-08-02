import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calendar-book',
  templateUrl: './calendar-book.page.html',
  styleUrls: ['./calendar-book.page.scss'],
})


export class CalendarBookPage implements OnInit {

  selectedBdRoom: any = {};
  bdName: any;
  monthName: any;

  event = {
    title: '',
    bookBy: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    currentMonth: new Date().getMonth(),
    
  };

  @ViewChild(CalendarComponent, { static: true }) myCal: CalendarComponent;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    console.log(this.calendar.currentMonth);
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedBdRoom = params;


    });

    console.log(this.selectedBdRoom);
    if (this.selectedBdRoom.boardRoom == "1") {
      this.bdName = "Board Room 1";
    } else {
      this.bdName = "Board Room 2";
    }

    console.log(this.bdName);
    this.resetEvent();

    // this.monthNum[0] = "January";

    this.getMonthName();



  }

  resetEvent() {
    this.event = {
      title: '',
      bookBy: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      bookBy: this.event.bookBy,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
      
    }

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    if((eventCopy.startTime < this.calendar.currentDate) || (eventCopy.startTime> eventCopy.endTime)){
      this.TimeValidateMsg();
    }else{
      this.eventSource.push(eventCopy);
      this.myCal.loadEvents();
    }
   
    this.resetEvent();
  }

  // Change current month/week/day
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
    this.calendar.currentMonth = this.calendar.currentMonth + 1;
    this.getMonthName();

    
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
    this.calendar.currentMonth = this.calendar.currentMonth - 1;
    this.getMonthName();
    
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  //month
  month() {
    this.calendar.currentMonth = new Date().getMonth();
  }

  // today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title + ' by ' + event.bookBy,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  getMonthName() {

    if (this.calendar.currentMonth == 0) {
      this.monthName = "January";
    } else if (this.calendar.currentMonth == 1) {
      this.monthName = "February";
    } else if (this.calendar.currentMonth == 2) {
      this.monthName = "March";
    } else if (this.calendar.currentMonth == 3) {
      this.monthName = "April";
    } else if (this.calendar.currentMonth == 4) {
      this.monthName = "May";
    } else if (this.calendar.currentMonth == 5) {
      this.monthName = "June";
    } else if (this.calendar.currentMonth == 6) {
      this.monthName = "July";
    } else if (this.calendar.currentMonth == 7) {
      this.monthName = "August";
    } else if (this.calendar.currentMonth == 8) {
      this.monthName = "September";
    } else if (this.calendar.currentMonth == 9) {
      this.monthName = "October";
    } else if (this.calendar.currentMonth == 10) {
      this.monthName = "November";
    } else if (this.calendar.currentMonth == 11) {
      this.monthName = "December";
    }

  }


  async TimeValidateMsg(){
    const alert = await this.alertCtrl.create({
          header: 'Wrong Time!',
         
          message: 'Time selection went wrong. Please do not select a past date or time !!',
          buttons: ['OK']
        });
    
        await alert.present();
  }


}
