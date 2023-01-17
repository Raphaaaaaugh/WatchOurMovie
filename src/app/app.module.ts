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
import { CalendrierComponent } from './calendrier/calendrier.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { RegisterComponent } from './register/register.component';
import { DisponibilityComponent } from './disponibility/disponibility.component';
import { ListDispoComponent } from './list-dispo/list-dispo.component';
import { SpecialityComponent } from './speciality/speciality.component';
import { MatterComponent } from './matter/matter.component';
import { AddMatterComponent } from './add-matter/add-matter.component';


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
    CalendrierComponent,
    RegisterComponent,
    DisponibilityComponent,
    ListDispoComponent,
    SpecialityComponent,
    MatterComponent,
    AddMatterComponent
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
