import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataservicesService} from '../dataservices.service';
import {CommonService} from '../common.service';
import {Storage} from '@ionic/storage';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginResponse: any;
    lastTimeBackPress = 0;
    timePeriodToExit = 2000;

  constructor(private router: Router,
              private api: DataservicesService,
              private common: CommonService,
              public storage: Storage,
              private platform: Platform) {

      this.backButtonEvent();
  }

  ngOnInit() {
  }


    // active hardware back button
    backButtonEvent() {
        this.platform.backButton.subscribe(async () => {

            // close modal
            // close side menua
            if (this.router.url === '/login') {
                if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                    // this.platform.exitApp(); // Exit from app
                    navigator['app'].exitApp(); // work in ionic 4

                } else {
                    this.common.showToast("Press agin to exit app");
                    this.lastTimeBackPress = new Date().getTime();
                }
            }
        });
    }


    async login(form) {
    const loginFormData = new FormData();
    loginFormData.append('email', form.value.email);
    loginFormData.append('password',  form.value.password);

    this.api.doLogin(loginFormData).subscribe(res => {
          this.loginResponse = res;

          console.log(JSON.parse(this.loginResponse).sta)

        if (JSON.parse(this.loginResponse).sta == "1"){
            this.storage.set("id",JSON.parse(this.loginResponse).id)
            this.storage.set("fname",JSON.parse(this.loginResponse).name)
            this.storage.set("lname",JSON.parse(this.loginResponse).lname)
            this.storage.set("email",JSON.parse(this.loginResponse).email)
            this.storage.set("photo",JSON.parse(this.loginResponse).photo)

            this.router.navigateByUrl('/home')
        }else {
            this.common.showToast(JSON.parse(this.loginResponse).status_message);
        }

        }, err => {
          console.log(err)
        }
    )
  }
}
