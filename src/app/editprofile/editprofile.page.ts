import {Component, OnInit} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {CommonService} from '../common.service';
import {LoadingController} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {Storage} from '@ionic/storage';
import {DataservicesService} from '../dataservices.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-editprofile',
    templateUrl: './editprofile.page.html',
    styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
    myphoto: any;
    date: any;
    currnetDt: any;
    profileResponse: any;
    id;fname;lname;email;photo;


    constructor(public camera: Camera,
                public common: CommonService,
                public fileTransfer: FileTransfer,
                public api : DataservicesService,
                public storage: Storage,
                public router: Router,
                public transfer: FileTransferObject) {

        this.date = new Date();

        this.currnetDt = new DatePipe('en-US').transform(this.date, 'ddMMyyyyHHss');
        console.log(this.currnetDt);
    }

    ngOnInit() {
        this.getInfo();
    }

    takePhoto() {
        const options: CameraOptions = {
            quality: 100,
            targetHeight: 150,
            targetWidth: 200,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA
        };
        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.myphoto = 'data:image/jpeg;base64,' + imageData;

        }, (err) => {
            console.log(err);
        });
    }


    ImageUpload() {
        if (this.myphoto == undefined) {
            this.common.showToast('Please Select Image');
        } else {
            const fileTransfer: FileTransferObject = this.fileTransfer.create();

            let options: FileUploadOptions = {

                fileKey: 'file',
                fileName: 'myImage_' + this.currnetDt + '.jpg',
                chunkedMode: false,
                httpMethod: 'post',
                mimeType: 'image/jpeg',
                headers: {}
            };

            fileTransfer.upload(this.myphoto, 'http://127.0.0.1/news/upload.php', options)
                .then((data) => {

                    console.log('Data', data);
                    this.common.showToast('Photo Uploaded,Please Login Again!');
                    this.storage.clear();
                    this.router.navigateByUrl('/login');
                }, (err) => {
                    console.log(err);
                });
        }
    }


    getInfo(){
        this.storage.get('fname').then((val) => {
            this.fname  = val;
            console.log(this.fname)
        });

        this.storage.get('lname').then((val) => {
            this.lname  = val;
        });

        this.storage.get('email').then((val) => {
            this.email  = val;

        });

        this.storage.get('id').then((val) => {
            this.id  = val;
        });

        this.storage.get('photo').then((val) => {
            this.photo  = val;
            console.log(this.photo)
        });
    }

    updateProfile(){

        const data = new FormData();
        data.append('fname', this.fname);
        data.append('lname',  this.lname);
        data.append('email',  this.email);
        data.append('id',  this.id);

        this.api.updateProfile(data).subscribe(res=>{
            this.profileResponse = res;
            this.common.showToast("Profile Updated, Please Login Again..")
            this.storage.clear();
            this.router.navigateByUrl('/login');
        },err=>{
            console.log(err)
        })
    }
}
