import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../service/movies.service';
import { Movie } from '../type/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor() { 
    
  }

  ngOnInit(): void {
  }

 

}
