import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/type/types';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {


  topRated:Array<Movie>=[];
  moviePage:Array<Movie>=[];
  pageSize:number=0;
  page:number=1;

  constructor(public movieServie: MoviesService) {
    
    movieServie.topRated().subscribe(movie => {
      console.log(movie)
      this.topRated=movie;
      this.pageSize= this.topRated.length/20
    this.page=1;
   console.log(this.topRated)
    this.loadItems()
    })
    
   }

  ngOnInit(): void {
  }


  async loadItems() {
   

    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;


    for (let index = startIndex; index < endIndex-1; index++) {
      this.moviePage.push(this.topRated[index]);
      
    }


  }
  onPageChange(page: number) {
    this.page = page;
    this.loadItems();
  }
}
