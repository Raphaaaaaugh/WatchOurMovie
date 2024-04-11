import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { RegisterComponent } from './register/register.component';
import { MoviesComponent } from './movie/movies/movies.component';
import { GenreMovieComponent } from './movie/genre-movie/genre-movie.component';
import { TopRatedComponent } from './movie/top-rated/top-rated.component';
import { MovieComponent } from './movie/movie/movie.component';
import { AddMovieComponent } from './movie/add-movie/add-movie.component';
import { EditMovieComponent } from './movie/edit-movie/edit-movie.component';
import { HeaderComponent } from './movie/header/header.component';
import { EngieComponent } from './movie/engie/engie.component';
import { SeeMovieComponent } from './movie/see-movie/see-movie.component';





class CustomDateFormatter extends CalendarNativeDateFormatter {
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
      return new Intl.DateTimeFormat('ca', {
          hour: 'numeric',
          minute: 'numeric'
      }).format(date);
  }

  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat('ca', {
        hour: 'numeric',
        minute: 'numeric'
    }).format(date);
}
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,

    RegisterComponent,
     MoviesComponent,
     GenreMovieComponent,
     TopRatedComponent,
     MovieComponent,
     AddMovieComponent,
     EditMovieComponent,
     HeaderComponent,
     EngieComponent,
     SeeMovieComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    FlatpickrModule,
    NgbModalModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }, {
      dateFormatter: {
        provide: CalendarDateFormatter,
        useClass: CustomDateFormatter
      }
    }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
