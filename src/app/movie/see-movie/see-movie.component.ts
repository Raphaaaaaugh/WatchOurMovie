import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie, User, Users } from 'src/app/type/types';

@Component({
  selector: 'app-see-movie',
  templateUrl: './see-movie.component.html',
  styleUrls: ['./see-movie.component.css']
})
export class SeeMovieComponent implements OnInit {

  seeMovie:Array<Movie>=[];
  moviePage:Array<Movie>=[];
  pageSize:number=0;
  page:number=1;

  constructor(public movieServie: MoviesService) {
   
    const user: Users[]=[
      {
name:'User1',
id:1,
firstname:'John',
password:'pwd'
      },
      {
        name:'User2',
        id:1,
        firstname:'Jane',
        password:'pwd'
              }
    ]
    movieServie.getMovieToSee(user).subscribe(movie => {
      console.log(movie)
      this.seeMovie=movie;
      this.pageSize= this.seeMovie.length/20
    this.page=1;
   console.log(this.seeMovie)
    this.loadItems()
    })
    
   }

  ngOnInit(): void {
  }


  async loadItems() {
   

    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;


    for (let index = startIndex; index < endIndex-1; index++) {
      this.moviePage.push(this.seeMovie[index]);
      
    }


  }
  onPageChange(page: number) {
    this.page = page;
    this.loadItems();
  }
}
