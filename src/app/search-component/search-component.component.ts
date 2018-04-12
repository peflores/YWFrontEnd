import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { City } from '../city';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {

  city$ : Observable<City>;

  isRepeat: boolean = false;

  constructor(private weatherService: WeatherServiceService) { }

  addCity(city: City): void {
    this.isRepeat = this.weatherService.isRepeat(city);

    if(!this.isRepeat) {
      this.weatherService.clearFindCity();
      this.weatherService.addCity(city);
    }
  }

  clearFindCity(){
    this.weatherService.clearFindCity();
  }

  ngOnInit() {
    this.city$ = this.weatherService.getFindCity();
  }

  findCity(cityName: string): void {
    if (!cityName) { return; }
    this.weatherService.findCity(cityName);
  }
}
