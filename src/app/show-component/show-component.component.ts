import { Component, OnInit, Input } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { City } from '../city';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
@Component({
  selector: 'app-show-component',
  templateUrl: './show-component.component.html',
  styleUrls: ['./show-component.component.css']
})
export class ShowComponentComponent implements OnInit {

  public followingCity: Observable<City[]>;

  constructor(private weatherService: WeatherServiceService) { }

  ngOnInit() {
    this.followingCity = this.weatherService.getAllCitys();
  }

  ngDoCheck() {

  }

  ngOnDestroy(){
    this.weatherService.stopPollingToServer();

  }

  removeCity(city: City){
    this.weatherService.removeCity(city);
  }
}
