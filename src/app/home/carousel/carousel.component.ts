import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  carouselItems: any = [];

  constructor() {
    this.carouselItems = [
      {
        url: '../../../assets/images/others/1.jpg',
        label: 'Make your wedding memorable',
        text: 'Enjoy your wedding occasion with our perfect live streaming style. We provide you with a Perfect Venues to the precious moments of your life.',
      },
      {
        url: '../../../assets/images/others/3.jfif',
        label: 'Banquets Near You',
        text: 'Explore best Banquets in your vicinity, you ask, we provide.',
      },
      {
        url: '../../../assets/images/others/2.jfif',
        label: 'Best Event Management Company',
        text: 'We make sure that you will get the best packages and mega deals in affordable prices.',
      },
    ];
  }

  ngOnInit(): void {}
}
