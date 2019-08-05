import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class BoardroomService {
  URL = environment.back_end_URL
  constructor(private http: HTTP) { }


  submitEvent(data) {
    return this.http.post(this.URL + 'sendData', data, {});

  }

  getEvents(bdno){
    return this.http.post(this.URL + 'getEvents', bdno, {});
  }

  // getList(){
  //   return this.http.post(this.URL + 'getEvents', {}, {});
  // }


}
