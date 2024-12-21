import { Component, OnInit } from '@angular/core';
import { Hotel, HotelService } from '../hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  loading = true;

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe({
      next: (data) => {
        this.hotels = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching hotels:', error);
        this.loading = false;
      },
    });
  }
}
