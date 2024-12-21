import { Component, Input } from '@angular/core';
import { Hotel } from '../hotel.service';

@Component({
  selector: 'app-hotel-unit',
  templateUrl: './hotel-unit.component.html',
  styleUrls: ['./hotel-unit.component.css'],
})
export class HotelUnitComponent {
  @Input() hotel!: Hotel;
}
