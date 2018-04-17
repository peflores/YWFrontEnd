import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { Board } from '../board';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
@Component({
  selector: 'dash-board-list',
  templateUrl: './dash-board-list.component.html',
  styleUrls: ['./dash-board-list.component.css']
})
export class DashBoardList implements OnInit {

  public boards : Observable<Board[]>;

  constructor(private weatherService: WeatherServiceService) { }

  addBoard(): void {
    let numberName: string = 'Board ' + this.weatherService.getBoardLength();
    let board = new Board('', '', numberName);
    this.weatherService.addBoard(board);
  }

  setCurrentBoard(board: Board): void{
    this.weatherService.stopPollingToServer();
    this.weatherService.setCurrentBoard(board);
    this.weatherService.loadAllCitys();
  }

  ngOnInit() {
    this.boards = this.weatherService.getAllBoard();
    this.weatherService.loadAllBoards();
    console.log('fin ngOnInit');
  }

  ngDoCheck() {
    console.log('init dashboard ngDoCheck');

  }

}
