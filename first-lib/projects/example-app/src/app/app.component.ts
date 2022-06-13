import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { threadId } from 'worker_threads';
import { ControlOf, Feature, Outlet } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'example-app';
  exampleForm: FormGroup<ControlOf<Outlet>>;

  constructor(private fb: FormBuilder){

    // Comment out the following line to see the error
    this.exampleForm = this.fb.group<ControlOf<Outlet>>({
      name: this.fb.nonNullable.control(''),
      id: this.fb.nonNullable.control(''),
      isActive: this.fb.nonNullable.control(true),
      sort: this.fb.nonNullable.control(0),
      metadata: this.fb.control(null),
      internalName: this.fb.nonNullable.control(''),
      bizType: this.fb.control(null),
      zone: this.fb.control(null),
      franchise: this.fb.control(null),
      features: this.fb.group<ControlOf<Feature>>({
        booking: this.fb.control(null),
      }),
      tax: this.fb.control(null),
      // location: this.fb.group({
      //   address: this.fb.nonNullable.control(''),
      //   zip: this.fb.nonNullable.control(''),
      //   lat: this.fb.nonNullable.control(0),
      //   long: this.fb.nonNullable.control(0),
      // }),
    });
  }

  ngOnInit(): void {
    this.exampleForm.get('name')?.setValue('test');
  }
}


