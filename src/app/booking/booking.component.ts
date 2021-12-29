import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder, FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookingService } from './booking.service';
import { Venue } from '../interfaces';
import { VenueService } from '../home/venue/venue.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class BookingComponent implements OnInit {

  id: number = 1;
  venue: Venue = {};
  loading: Boolean = true;
  error: Boolean = false;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  @ViewChild('carousel') carousel: any;

  firstFormGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.minLength(11), Validators.required,]),
    address: new FormControl('', [
      Validators.required,
    ]),
  });
  secondFormGroup = new FormGroup({
    budget: new FormControl('', [Validators.minLength(4), Validators.required]),
  });
  thirdFormGroup = new FormGroup({
    capacity: new FormControl('', [Validators.minLength(4), Validators.required]),
    date: new FormControl('', [Validators.required])
  });

  stepperOrientation: Observable<StepperOrientation>;
  constructor(private _Activatedroute: ActivatedRoute, private venueService: VenueService, private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private bookingService: BookingService,


  ) {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      console.log("id", typeof this.id)
      this.venueService.getVenue(this.id).subscribe((result: Venue) => {
        console.log('Result of fetch venue', result);
        this.venue = result;
        this.carousel.play();
      });
    });
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 576px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

  }
  clickNext(step: Number) {
    switch (step) {
      case 0: {
        console.log("firstFormGroup", this.firstFormGroup.controls.phoneNumber, this.firstFormGroup.controls.phoneNumber.hasError('minlength'))

        return;
      }
      case 1: {
        console.log("secondFormGroup", this.secondFormGroup)
        return;
      }
      case 2: {
        console.log("thirdFormGroup", this.thirdFormGroup)
        return;
      }
      default: {
        console.log("default case")
      }
    }
  }

  async submitForm() {
    let userFromLocalStorage = localStorage.getItem('user');
    let user;
    if (userFromLocalStorage) {
      user = JSON.parse(userFromLocalStorage);
    }
    console.log("add booking values", { ...this.firstFormGroup.value, ...this.secondFormGroup.value, ...this.thirdFormGroup.value }, this.venue.id, user.id)
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      this.loading = true;

      console.log("all valid")
      this.bookingService
        .addBooking({ ...this.firstFormGroup.value, ...this.secondFormGroup.value, ...this.thirdFormGroup.value }, this.venue.id ? this.venue.id : 0, user.id ? user.id : 0)
        .subscribe((response: any) => {
          console.log("inbooking component", response)
          this.loading = false;
          response.status == 201 ? this.error = false : this.error = true;
        })
    }
  }

  ngAfterViewInit(): void {

    console.log('this.carousel', this.carousel, this.venue)
    // this.carousel.next();
  }


  stepClick(ev: any) { console.log("event", ev) }



  ngOnInit(): void {
    console.log("this is venue in ngOnInit", this.venue)
  }

}
