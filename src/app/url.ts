import { Injectable } from '@angular/core';
@Injectable()
export class Url {

  private URL_SERVER: string = "//localhost:8080/serverSide";

  private weatherUrl: string = "http://query.yahooapis.com/v1/public/yql?u=f&format=json&q=select item from weather.forecast where woeid in "

  private weatherWhere: string = "(select woeid from geo.places(1) where text";

  private endWhere: string = ")";

  private addUrl: string = "/addCity";

  getUrlYahooApi(cityName: string) {
    return `${this.weatherUrl}${this.weatherWhere}='${cityName}'${this.endWhere}`;
  }

  getUrlAddLocalServer() {
    return `${this.URL_SERVER}${this.addUrl}`;
  }

}
