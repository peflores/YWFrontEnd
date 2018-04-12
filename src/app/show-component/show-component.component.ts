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
    this.weatherService.loadAllCitys();
    this.weatherService.startPollingToServer();
    console.log('fin ngOnInit');
  }

  ngDoCheck() {
    console.log('init ngDoCheck');
    this.weatherService.refreshCitys();
  }

  ngOnDestroy(){
    this.weatherService.stopPollingToServer();
  }
}
