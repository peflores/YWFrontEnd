import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from './city';
import { YahooQuery } from './yahooQuery';
import { Url } from './url';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };


@Injectable()
export class WeatherServiceService {

  private citySubject = new Subject<City>();

  private citys: City[] = [];

  private bCitySubject = new BehaviorSubject<City[]>(this.citys);

  private searchCity: City;

  private stopPolling: boolean = false;

  constructor( private http: HttpClient, private url: Url) {}

  findCity(cityName: string) {
    console.log('find city');
    this.http.get<YahooQuery>(this.url.getUrlYahooApi(cityName)).subscribe(data =>
    {
      if(data.query.count > 0) {
        this.searchCity = new City(null,data.query.results.channel.item.condition.date,
        data.query.results.channel.item.description,
         null, data.query.results.channel.item.lat,
         data.query.results.channel.item.long,
         data.query.results.channel.item.condition.temp,
         data.query.results.channel.item.condition.text,
         data.query.results.channel.item.title,
         data.query.results.channel.units.temperature);
        this.refreshFindCitys();
      }
    });
  }

  isRepeat(city: City): boolean{
    for(let cityFollow of this.citys) {
      if(cityFollow.lon === city.lon &&
          cityFollow.lat === city.lat){
          return true;
      }
    }
    return false;
  }

  addCity(city: City) {
    this.http.post<City>(this.url.getUrlAddLocalServer(), city, httpOptions)
    .subscribe(serverCity => this.citys.push(serverCity));
    this.refreshCitys();
  }

  getAllCitys(): Observable<City[]> {
    return this.bCitySubject.asObservable();
  }

  loadAllCitys() {
    this.http.get<City[]>(this.url.getUrlAllCitys()).subscribe(data => this.citys = data);
  }

  refreshCitys() {
    this.bCitySubject.next(this.citys);
  }

  refreshFindCitys() {
    this.citySubject.next(this.searchCity);
  }
  getFindCity(): Observable<City>{
    return this.citySubject.asObservable();
  }

  clearFindCity(){
    this.citySubject.next(null);
  }

  startPollingToServer() {
    this.stopPolling = false;
    Observable.interval(10000).takeWhile(()=>!this.stopPolling).subscribe(()=>{
      console.log('pollint to server');
      this.loadAllCitys();
      this.refreshCitys();
    })
  }
  stopPollingToServer() {
    this.stopPolling = true;
  }
}
