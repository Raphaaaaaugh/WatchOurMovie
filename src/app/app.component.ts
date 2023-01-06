import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'planing-lib';

  role=sessionStorage.getItem("role");
  
    user=sessionStorage.getItem('user');
    userObject=this.user ? JSON.parse(this.user) :""
    

  
  logout(){
    sessionStorage.clear();
    window.location.reload();
  }
}
