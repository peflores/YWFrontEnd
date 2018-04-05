import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ShowComponentComponent } from './show-component/show-component.component';
import { SearchComponentComponent } from './search-component/search-component.component';
import { WeatherServiceService } from './weather-service.service';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, AppBootstrapModule,AngularFontAwesomeModule],
  declarations: [ AppComponent, HelloComponent, SearchComponentComponent, ShowComponentComponent ],
  bootstrap:    [ AppComponent ],
  providers: [WeatherServiceService]
})
export class AppModule { }
