import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class BoardroomService {
  URL = 'http://104.247.79.129:3000/';
  constructor(private http: HTTP) { }

  register(data) {
    return this.http.post(this.URL+'sendUserData', data, {});
  }

  submitEvent(data) {
    return this.http.post(this.URL + 'sendData', data, {});

  }

  getEvents(bdno){
    return this.http.post(this.URL + 'getEvents', bdno, {});
  }

  sendRequest(data){
    return this.http.post(this.URL+'requestChange', data, {});
  }

  // getList(){
  //   return this.http.post(this.URL + 'getEvents', {}, {});
  // }

  checkReq(data){
    return this.http.post(this.URL + 'getRequests', data, {});
  }


  updateEvent(data){
    return this.http.post(this.URL + 'updateEvents', data, {});
  }

  deleteEvent(data){
    return this.http.post(this.URL + 'deleteEvents', data, {});
  }

  readRequest(data){
    return this.http.post(this.URL + 'readReqs', data, {});
  }

}
