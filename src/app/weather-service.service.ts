import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class WeatherServiceService {

  private weatherUrl = "http://query.yahooapis.com/v1/public/yql?u=f&format=json&q=select item from weather.forecast where woeid in "

  private weatherWhere = "(select woeid from geo.places(1) where text";

  private endWhere = ")";

  constructor( private http: HttpClient) { }

  getCitys(name: String): Observable<any> {
    return this.http.get(`${this.weatherUrl}${this.weatherWhere}='${name}'${this.endWhere}`);
  }
}
