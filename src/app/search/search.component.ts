import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewportScroller } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Options, LabelType } from '@angular-slider/ngx-slider';

import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  startWith,
} from 'rxjs/operators';
import { Venue } from '../interfaces';
import { Router } from '@angular/router';
import { VenueService } from '../home/venue/venue.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  loading: boolean = false;
  venues$!: Observable<Venue[]>;

  math = Math;
  imageURL = 'https://source.unsplash.com/random/300x200?sig=';
  allVenues: Array<Venue> = [];
  currentRate = 6;
  starRating = (10 * this.math.random()) / 2;
  pageSize = 6;
  page = 1;

  cityControl = new FormControl('', [Validators.required]);
  areaControl = new FormControl('', [Validators.required]);
  radiusControl = new FormControl('', [Validators.required]);
  cityOptions: string[] = ['Karachi', 'Lahore', 'Islamabad', 'Multan'];
  areaOptions: string[] = [
    'All Areas',
    'North-Nazimabad',
    'Rashid-Minhas-Road',
    'Saddar',
    'Nazimabad',
    'F.B Area',
    'Surjani-Town',
    'Gulshan-e-Iqbal',
    'Stadium-Road',
    'Sharah-e-Faisal',
    'Metropole',
    'Civil lines',
    'Gulistan-e-jauhar',
    'Clifton',
  ];
  filteredCityOptions!: Observable<string[]>;
  filteredAreaOptions!: Observable<string[]>;
  formGroupToggleSwitch: FormGroup;
  minPrice: number = 0;
  maxPrice: number = 400000;
  minCap: number = 0;
  maxCap: number = 500;

  priceOptions: Options = {
    floor: 0,
    ceil: 1000000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> 💲' + value;
        case LabelType.High:
          return '<b>Max price:</b> 💲' + value;
        default:
          return '💲' + value;
      }
    },
  };
  capacityOptions: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min cap:</b> 👤' + value;
        case LabelType.High:
          return '<b>Max cap:</b> 👤' + value;
        default:
          return '👤 ' + value;
      }
    },
  };

  constructor(
    private scroller: ViewportScroller,
    private router: Router,
    formBuilder: FormBuilder,
    private venueService: VenueService,
    private viewportScroller: ViewportScroller
  ) {
    this.formGroupToggleSwitch = formBuilder.group({
      nearByVenues: [true],
    });
  }
  onFormSubmitToggleSwitch() {
    alert(JSON.stringify(this.formGroupToggleSwitch.value, null, 2));
  }

  private _filterArea(value: string): string[] {
    console.log('value', value, 'this.areaOptions', this.areaOptions);
    const filterValue = value.toLowerCase();
    return this.areaOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  private _filterCity(value: string): string[] {
    console.log('value', value, 'this.cityOptions', this.cityOptions);
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.filteredAreaOptions = this.areaControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterArea(value))
    );
    this.filteredCityOptions = this.cityControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCity(value))
    );
  }
  scrollToElement(element: string) {
    this.router.navigate([], { fragment: element });
    // this.scroller..scrollToAnchor(element);
  }
  handlePageChange(event: number) {
    console.log('handlePageChange event', Number(event));
    this.page = event;
  }
  async onSubmit() {
    console.log(
      'formGroupToggleSwitch',
      this.formGroupToggleSwitch.controls.nearByVenues.value
    );
    if (!this.formGroupToggleSwitch.controls.nearByVenues.value) {
      this.areaControl.markAsTouched();
      this.cityControl.markAsTouched();
      console.log('city form control', this.cityControl.errors);
      console.log('area form control', this.areaControl.errors);
      console.log('Prices ', this.minPrice, this.maxPrice);
      console.log('Capacity', this.minCap, this.maxCap);
      if (!this.cityControl.errors && !this.areaControl.errors) {
        this.loading = true;
        console.log('Final values of CITY-AREA => ');
        console.log('City : ', this.cityControl.value);
        console.log('Area : ', this.areaControl.value);
        console.log('Price : ', this.minPrice, ' - ', this.maxPrice);
        console.log('Cap : ', this.minCap, ' - ', this.maxCap);
        this.venueService
          .searchVenuesByArea(
            this.cityControl.value,
            this.areaControl.value,
            this.minPrice,
            this.maxPrice,
            this.minCap,
            this.maxCap
          )
          .subscribe((result: Array<Venue>) => {
            console.log('Result of fetch venues', result);
            this.allVenues = result;
            this.loading = false;
            this.viewportScroller.scrollToAnchor('scroll1');
          });
      }
    } else {
      this.radiusControl.markAsTouched();
      console.log('radius form control', this.radiusControl.errors);

      if (!this.radiusControl.errors) {
        try {
          this.loading = true;
          let resp = await this.getPosition();
          console.log(resp);
          console.log('Final values RADIUS => ');
          console.log('Radius : ', this.radiusControl.value);

          console.log('Price : ', this.minPrice, ' - ', this.maxPrice);
          console.log('Cap : ', this.minCap, ' - ', this.maxCap);
          this.venueService
            .searchVenuesByCurrentLocation(
              resp.lat,
              resp.lng,
              this.radiusControl.value,
              this.minPrice,
              this.maxPrice,
              this.minCap,
              this.maxCap
            )
            .subscribe((result: Array<Venue>) => {
              console.log('Result of fetch venues', result);
              this.allVenues = result;
              this.loading = false;
              this.viewportScroller.scrollToAnchor('scroll1');
            });
        } catch (err) {
          this.loading = false;
          console.log('rejected', err);
        }
      }
    }
    //   // setTimeout(() => {
    //   //   this.loading = false
    //   // }, 2000)
  }
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          console.log('getPosition', resp);
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
