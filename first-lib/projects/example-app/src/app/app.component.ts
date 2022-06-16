import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { threadId } from 'worker_threads';
import { ControlOf, Feature, ImgUploadType, MultiImgUploadType, Outlet } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'example-app';
  // exampleForm: FormGroup<ControlOf<Required<Outlet>>>;

  constructor(private fb: NonNullableFormBuilder){

    // Comment out the following line to see the error
    // this.exampleForm = this.fb.group<ControlOf<Outlet>>({
    //   name: this.fb.control(''),
    //   id: this.fb.control(''),
    //   isActive: this.fb.control(true),
    //   sort: this.fb.control(0),
    //   metadata: this.fb.control(null),
    //   internalName: this.fb.control(''),
    //   bizType: this.fb.control(null),
    //   zone: this.fb.control(null),
    //   franchise: this.fb.control(null),
    //   status: this.fb.control(null),
    //   features: this.fb.group<ControlOf<Feature>>({
    //     booking: this.fb.control(null),
    //   }),
    //   tax: this.fb.control(null),
    //   location: this.fb.group({
    //     address: this.fb.control(''),
    //     zip: this.fb.control(''),
    //     lat: this.fb.control(0),
    //     long: this.fb.control(0),
    //   }),
    //   outletUrlId: this.fb.control(''),
    //   display: this.fb.group({
    //     subtitle: this.fb.control(''),
    //     video: this.fb.control(''),
    //     outletColor: this.fb.control(''),
    //     mobileBanner: this.fb.control(null),
    //     webBanner: this.fb.control(null),
    //     logo: this.fb.control(null),
    //     gallery: this.fb.control(null),
    //   }),
    // });
  }

  ngOnInit(): void {
  }
}


