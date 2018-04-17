import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { City } from '../city';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
@Component({
  selector: 'search-result-component',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

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

}
