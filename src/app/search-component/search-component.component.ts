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

  constructor(private weatherSrevice: WeatherServiceService) { }

  ngOnInit() {}

  followCity(city: City): void {
    var index = this.followingCity.indexOf(city, 0);
    if(index > -1) {
      console.log("objeto repetido");
    } else {
      console.log(this.followingCity.push(city));
      this.isNotEmpty = true;
    }
  }

  removeCandidate(): void{
    this.city = null;
  }
  searchListCity(cityName: String): void{
    if (!cityName) { return; }
    this.weatherSrevice.getCitys(cityName).subscribe(data => {
      if(data.query.count>0) {
        var item = data.query.results.channel.item;
        this.city =  new City(item.title,item.lat,item.long,item.description.replace("<![CDATA[", "").replace("]]>", ""),
        item.condition.date, item.condition.temp,item.condition.text);
      } else {
         this.city = null;
      }
    });
  }
}
