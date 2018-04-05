import { Component, OnInit, Input } from '@angular/core';
import { City } from '../city';
@Component({
  selector: 'app-show-component',
  templateUrl: './show-component.component.html',
  styleUrls: ['./show-component.component.css']
})
export class ShowComponentComponent implements OnInit {

  isNotEmpty: boolean = false;
  city : City;
  @Input() followingCity: City[] = [];

  constructor() { }

  ngOnInit() {

  }

  ngDoCheck(){
    if(this.followingCity.length > 0){
      this.isNotEmpty = true;
    }
  }
}
