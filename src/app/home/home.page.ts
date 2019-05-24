import { Component } from '@angular/core';

import {DataservicesService} from '../dataservices.service';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import { ViewChildren, QueryList } from '@angular/core';
import {
  AlertController,
  Platform,
  ModalController,
  ActionSheetController,
  PopoverController,
  IonRouterOutlet,
  MenuController,
  ToastController
} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import {CommonService} from '../common.service';

// set up hardware back button event.

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  newsData: any;

  constructor(public api: DataservicesService,
              public router: Router,
              public storage:Storage,
              public common: CommonService,
              public alertController: AlertController,
              public toast: ToastController ,
              private platform: Platform) {

    this.backButtonEvent();

  }


  ngOnInit() {
    this.getNews();
  }


  // active hardware back button
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {

      // close modal

      // close side menua

       if (this.router.url === '/home') {
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

  getNews(){
    this.api.getNews().subscribe(res => {
      this.newsData = JSON.parse(res).articles;
      console.log("newsData", this.newsData)
    }, error=>{
      console.log("Error")
    })
  }

  doRefresh(event) {
    this.getNews();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  newsDetails(news){
    console.log(news);
  }

  editProfile(){
    this.router.navigateByUrl('/editprofile')
  }

  async logout(){

    const alert = await this.alertController.create({
      header: 'Logout?',
      message: 'Logging out will clear your saved data! Click Okay to Continue',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.storage.clear();
            this.router.navigateByUrl('/login')
          }
        }
      ]
    });

    await alert.present();



  }

}
