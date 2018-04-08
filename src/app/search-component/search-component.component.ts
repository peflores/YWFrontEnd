import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { City } from '../city';
@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {

  isNotEmpty: boolean = false;
  city : City;
  followingCity: City[] = [];
  isRepeat: boolean = false;

  constructor(private weatherSrevice: WeatherServiceService) { }

  ngOnInit() {

  }

  followCity(city: City): void {
    this.isRepeat = false;
    for(let cityFollow of this.followingCity) {
      if(cityFollow.lon === city.lon &&
          cityFollow.lat === city.lat){
          this.isRepeat = true;
      }
    }
    if(!this.isRepeat) {
      this.weatherSrevice.addCity(city).subscribe(serverCity =>
      this.followingCity.push(serverCity));
    }
  }

  removeCandidate(): void{
    this.city = null;
    this.isRepeat = false;
  }

  searchListCity(cityName: string): void{
    if (!cityName) { return; }
    this.isRepeat = false;
    this.weatherSrevice.getCitys(cityName).subscribe(data => {
      if(data.query.count>0) {
        var item = data.query.results.channel.item;
        this.city =  new City(null, null, item.title, item.lat, item.long, item.description,
        item.condition.date, item.condition.temp, item.condition.text);
      } else {
         this.city = null;
      }
    });
  }
}
