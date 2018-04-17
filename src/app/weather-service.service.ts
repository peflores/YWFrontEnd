import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from './city';
import { YahooQuery } from './yahooQuery';
import { Url } from './url';
import { Board } from './board';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };


@Injectable()
export class WeatherServiceService {

  private citySubject = new Subject<City>();

  private citys: City[] = [];

  private boards: Board[] = [];

  private currentBoard: Board;

  private bBoardSubject = new BehaviorSubject<Board[]>(this.boards);

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

  addBoard(board: Board) {
    this.http.post<Board>(this.url.getUrlToAddBoard(), board, httpOptions)
    .subscribe((serverBoard) => {
    this.boards.push(serverBoard);
    this.refreshBoard();});

  }

  addCity(city: City) {
    this.http.post<City>(this.url.getUrlToAddCity(this.currentBoard.boardId), city, httpOptions)
    .subscribe(serverCity => this.citys.push(serverCity));
    this.refreshCitys();
  }

  getAllCitys(): Observable<City[]> {
    return this.bCitySubject.asObservable();
  }

  getAllBoard(): Observable<Board[]> {
    return this.bBoardSubject.asObservable();
  }

  getObserver(): Observable<City[]>{
    return this.http.get<City[]>(this.url.getUrlAllCitys(this.currentBoard.boardId));
  }

  loadAllCitys() {
    this.getObserver().subscribe((data) => {
      this.citys = data;
      this.refreshCitys();
      this.startPollingToServer();
    });
  }

  loadAllBoards() {
    this.http.get<Board[]>(this.url.getUrlAllBoard()).subscribe((data) => {
      this.boards = data;
      if(this.getBoardLength() >0 ) {
        this.setCurrentBoard(this.boards[0]);
        this.loadAllCitys();
      }
      this.refreshBoard();
    });
  }

  refreshCitys() {
    this.bCitySubject.next(this.citys);
  }

  refreshBoard() {
    this.bBoardSubject.next(this.boards);
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
      this.getObserver().subscribe((data) => {
        this.citys = data;
        this.refreshCitys();
      });
    })
  }

  setCurrentBoard(board: Board){
    console.log('Current board : ' +board);
    this.currentBoard = board;
  }

  stopPollingToServer(): void {
    this.stopPolling = true;
  }

  getBoardLength(): number {
    return this.boards.length;
  }

  removeCity(city: City): void {
    this.http.delete(this.url.getUrlDeleteCityBoard(this.currentBoard.boardId, city.cityId))
    .subscribe(()=>{(data) => {
        this.citys = data;
        this.refreshCitys();
      }
    });
  }
}
