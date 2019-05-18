import { Component } from '@angular/core';

import {DataservicesService} from '../dataservices.service';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public api: DataservicesService,
              public router: Router,
              public storage:Storage) {}
  newsData: any;
  ngOnInit() {
    this.getNews();
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
  logout(){
    this.storage.clear();
    this.router.navigateByUrl('/login')
  }

}
