import { BoardroomService } from './../service/boardroom.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  regForm: FormGroup;
  // registerForm: FormGroup;
  profileImage: any;
  profileImageURI: any;
  regSubmit: any;
  firstName: any;
  lastName: any;
  email: any;
  password: any;
  repassword: any;

  constructor(private boardroomService: BoardroomService, private router: Router, private camera: Camera, private file: File, private formBuilder: FormBuilder, private alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {


    this.regForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      password: [''],
      repassword: ['']
    });
  }

  registerData() {
    console.log(this.firstName);
    // if (!this.profileImage) {
    //   this.uploadImgAlert();
    // } else 

    // if () {

    //   this.emptyFields();

    // } else 
    if (this.password != this.repassword) {
      this.passwordAlert();
    } else {
      //this.regSubmit = false;
      let data = {
        "firstName": this.firstName,
        "lastName": this.lastName,
        "email": this.email,
        "password": this.password

      }

      this.boardroomService.register(data).then(async res => {
        let data = JSON.parse(res.data);
        if (data.sno === 200) {

          console.log('gotcha');
          // await this.boardroomService.upload(r.id, 'profileImage', this.profileImageURI);



          this.successAlert();
          this.navCtrl.navigateRoot('/login');

        } else if (data.sno === 500) {
          this.emailExists();
        } else {
          console.log('server err');
          this.serverAlert();
        }
        this.regForm.reset();
      }).catch(error => {
        //alert(JSON.stringify(error));
        this.regForm.reset();
        this.serverAlert();
      });



    }

  }

  getImage(type) {
    this.takePhoto(0, type);
  }

  getCamera(type) {
    this.takePhoto(1, type);
  }

  takePhoto(sourceType: number, type: any) {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    }

    this.camera.getPicture(options).then((imageData) => {
      let image = imageData.split("?")[0];
      let filename = image.substring(image.lastIndexOf('/') + 1);
      let path = image.substring(0, image.lastIndexOf('/') + 1);


      this.profileImageURI = image;
      this.file.readAsDataURL(path, filename).then(res => this.profileImage = res);

    }, (err) => {
      console.log(err);
    });

  }

  async uploadImgAlert() {
    const alert = await this.alertController.create({

      message: 'Please Upload A Profile Photo',
      buttons: ['OK']
    });

    await alert.present();
  }

  async passwordAlert() {
    const alert = await this.alertController.create({

      message: 'Password Mismatched!!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async serverAlert() {
    const alert = await this.alertController.create({
      header: 'Something went wrong!',
      message: 'Please try again later',
      buttons: ['OK']
    });

    await alert.present();
  }


  async successAlert() {
    const alert = await this.alertController.create({

      message: 'You have registered Successfully!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async emptyFields() {
    const alert = await this.alertController.create({

      message: 'Please Enter all the fields',
      buttons: ['OK']
    });

    await alert.present();
  }

  async emailExists() {
    const alert = await this.alertController.create({

      message: 'Your email is already exists!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
