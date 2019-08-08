import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController, NavController} from '@ionic/angular';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  email: any;
  password: any;
  loggedEmail: any;
  loggedId: any;
  userName: any;

  constructor(private authService: AuthenticationService,private router: Router, private formBuilder: FormBuilder, private alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
    
      email: ['', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      password: ['', Validators.required],
     
    });
    
  }

  

  loginData(){
    if (this.loginForm.invalid) {
      this.emptyFields();

    }
    else {
      console.log(this.loginForm.value);
      console.log(this.email);
      console.log(this.password);
      let data = {
      
        "email": this.email,
        "password": this.password

      }

      this.authService.loginPassData(data).then(res => {
        let data = JSON.parse(res.data);
        if (data.sno === 200) {
          console.log(data);
          this.authService.loginAuthenticate(this.loginForm.value.email, data.isAuthentication, data.token, data.id);
          this.successAlert();
          
          this.loggedEmail = this.loginForm.value.email;
          this.loggedId = data.id;
          this.userName = data.fullname;
         
          this.passData();

         
        } else if(data.sno === 404){
          this.noUserAlert();
        }else {
          console.log(data);
          this.pwAlert();
        }
        this.loginForm.reset();      
      })
        .catch(err => {
          this.serverAlert();
          this.loginForm.reset();  
        });

    }

  }

  passData(){
    let param = {
      "email": this.loggedEmail,
      "id": this.loggedId,
      "username": this.userName
      
    }

   

    this.router.navigate(['home'], { queryParams: param });
    

  }

  async emptyFields() {
    const alert = await this.alertController.create({
     
      message: 'Please Enter all the fields',
      buttons: ['OK']
    });

    await alert.present();
  }

  async successAlert() {
    const alert = await this.alertController.create({
     
      message: 'Successfully Logged!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async pwAlert() {
    const alert = await this.alertController.create({
     
      message: 'Incorrect Passsword!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async serverAlert() {
    const alert = await this.alertController.create({
      header: 'Something went wrong! ',
      message: 'Please try again later',
      buttons: ['OK']
    });

    await alert.present();
  }

  async noUserAlert() {
    const alert = await this.alertController.create({
      header: 'No User Found! ',
      message: 'Please Sign Up',
      buttons: ['OK']
    });

    await alert.present();
  }
}
