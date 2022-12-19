import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'planing-lib';

  role=sessionStorage.getItem("role");
  
  logout(){
    sessionStorage.clear();
  }
}
