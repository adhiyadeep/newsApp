import { Component, OnInit } from '@angular/core';
import {DataservicesService} from '../dataservices.service';

@Component({
  selector: 'app-newsdetails',
  templateUrl: './newsdetails.page.html',
  styleUrls: ['./newsdetails.page.scss'],
})
export class NewsdetailsPage implements OnInit {

  constructor(public api: DataservicesService) { }

  ngOnInit() {
  }

}
