import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {DataservicesService} from '../dataservices.service';
import {CommonService} from '../common.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public api :DataservicesService,
              private menu:MenuController,
              public router:Router,public common: CommonService) { }
  registerResponse: any;

  ngOnInit() {
  }

  register(form)
  {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const regFormData = new FormData();
    regFormData.append('fname', form.value.fname);
    regFormData.append('lname', form.value.lname);
    regFormData.append('email', form.value.email);
    regFormData.append('password', form.value.password);


    // @ts-ignore
    this.api.doRegister(regFormData, {headers: headers})._subscribe(res => {
      this.registerResponse = res.body;

      const sta = JSON.parse(res.body).sta;
      console.log(sta);
      if (sta == '1') {
        this.common.showToast('Thank you for Registeration.Please Login');
        this.router.navigateByUrl('/login');
      } else {
        this.common.showToast('Your email has been already registered.');
      }
    }, err => {
      console.log(err);
    });
  }
}
