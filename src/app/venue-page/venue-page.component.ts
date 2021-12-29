import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { VenueService } from '../home/venue/venue.service';
import { Venue } from '../interfaces';

@Component({
  selector: 'app-venue-page',
  templateUrl: './venue-page.component.html',
  styleUrls: ['./venue-page.component.scss']
})
export class VenuePageComponent implements OnInit {
  id: number = 1;
  venue: Venue = {};
  constructor(private _Activatedroute: ActivatedRoute, private venueService: VenueService
  ) {

    this._Activatedroute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      console.log("id", typeof this.id)
      this.venueService.getVenue(this.id).subscribe((result: Venue) => {
        console.log('Result of fetch venue', result);
        this.venue = result;
      });
    });
  }



  ngOnInit(): void {
    console.log("this is venue in ngOnInit", this.venue)
  }

}
