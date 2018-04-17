import { Injectable } from '@angular/core';
@Injectable()
export class Url {

  private URL_SERVER: string = "//localhost:8080/serverSide";

  private weatherUrl: string = "http://query.yahooapis.com/v1/public/yql?format=json&q=select units,item from weather.forecast where u=\"c\" and woeid in "

  private weatherWhere: string = "(select woeid from geo.places(1) where  text";

  private endWhere: string = ")";

  private addUrl: string = "/addCity";

  private addBoardUrl: string = "/addBoard";

  private allBoardUrl: string = "/allBoards";

  private allCityUrl: string = "/allCity";

  getUrlYahooApi(cityName: string) {
    return `${this.weatherUrl}${this.weatherWhere}='${cityName}'${this.endWhere}`;
  }

  getUrlAllBoard() {
    return `${this.URL_SERVER}${this.allBoardUrl}`;
  }
  getUrlToAddBoard() {
    return `${this.URL_SERVER}${this.addBoardUrl}`;
  }
  getUrlToAddCity(idBoard: string) {
    return `${this.URL_SERVER}/${idBoard}${this.addUrl}`;
  }

  getUrlAllCitys(idBoard: string) {
    return `${this.URL_SERVER}/${idBoard}${this.allCityUrl}`;
  }

  getUrlDeleteCityBoard(idBoard: string, idCity: string) {
    return `${this.URL_SERVER}/${idBoard}/${idCity}`;
  }

}
