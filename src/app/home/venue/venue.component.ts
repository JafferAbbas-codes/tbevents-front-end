import { VenueService } from './venue.service';
import { Component, OnInit } from '@angular/core';
import { Venue } from '../../interfaces';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss'],
})
export class VenueComponent implements OnInit {
  math = Math;
  imageURL = 'https://source.unsplash.com/random/300x200?sig=';
  allVenues: Array<Venue> = [];
  currentRate = 6;
  starRating = (10 * this.math.random()) / 2;
  pageSize = 6;
  page = 1;
  constructor(private venueService: VenueService) {}

  ngOnInit(): void {
    this.venueService.getVenues().subscribe((result: Array<Venue>) => {
      console.log('Result of fetch venues', result);
      this.allVenues = result;
    });
  }
  handlePageChange(event: number) {
    console.log('handlePageChange event', Number(event));
    this.page = event;
  }
}
