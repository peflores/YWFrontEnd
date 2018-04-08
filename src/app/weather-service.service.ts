import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from './city';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };


@Injectable()
export class WeatherServiceService {

  private URL_SERVER = '//localhost:8080/serverSide';

  private weatherUrl = "http://query.yahooapis.com/v1/public/yql?u=f&format=json&q=select item from weather.forecast where woeid in "

  private weatherWhere = "(select woeid from geo.places(1) where text";

  private endWhere = ")";

  constructor( private http: HttpClient) { }

  getCitys(name: String): Observable<any> {
    return this.http.get(`${this.weatherUrl}${this.weatherWhere}='${name}'${this.endWhere}`);
  }

  addCity(city: City): Observable<City> {
    return this.http.post<City>(this.URL_SERVER + '/addCity', city,httpOptions);
  }
}
