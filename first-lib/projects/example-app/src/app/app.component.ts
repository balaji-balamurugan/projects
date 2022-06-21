import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { forms } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  exampleForm: forms;

  constructor(private fb: NonNullableFormBuilder){

    // Comment out the following line to see the error
    this.exampleForm = new FormGroup({
      name: new FormControl(''),
      id: new FormControl(''),
      isActive: new FormControl<true>(true),
      sort: new FormControl(0),
    });
  }

}

