import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { Events } from '@ionic/angular';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private storage: Storage, private http: HTTP,private router: Router) {
    
   }

  getToken() {
    return this.storage.get('token');
  }

  getEmail() {
    return this.storage.get('email');
  }
  
  getFullName(){
    return this.storage.get('fullname');
  }

  getIsAuthentication() {
    return this.storage.get('isAuthentication');
  }

  getId() {
    return this.storage.get('id');
  }

  loginAuthenticate(email, isAuthentication, token, id,fullname,isApproved) {
    this.storage.set("email", email);
    this.storage.set("isAuthentication", isAuthentication);
    this.storage.set("token", token);
    this.storage.set("id", id);
    this.storage.set("fullname", fullname);
    this.storage.set("isApproved", isApproved)
  }

  requestsNumber(rlength){
    this.storage.set("rlength", rlength);
  }

  
  logoutAuthenticate() {
    this.storage.set("email", "");
    this.storage.set("isAuthentication", false);
    this.storage.set("token", "");
    this.storage.set("id", "");
    this.storage.set("fullname", "");
    this.storage.set("isApproved", 0);
    this.router.navigate(['/first-page']);
    
  }

  loginPassData(data) {
    let url = environment.back_end_URL + 'login';
    return this.http.post(url, data, {});
  }
}
