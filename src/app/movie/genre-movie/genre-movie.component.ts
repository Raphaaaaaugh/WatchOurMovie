import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/type/types';

@Component({
  selector: 'app-genre-movie',
  templateUrl: './genre-movie.component.html',
  styleUrls: ['./genre-movie.component.css']
})
export class GenreMovieComponent implements OnInit {

  movieGenre:Movie[]=[];
  id!: string | null;
  moviePage:Array<Movie>=[];
  pageSize:number=0;
  page:number=1;


  constructor(private movieServie: MoviesService,private route: ActivatedRoute) { 
    this.id = this.route.snapshot.paramMap.get('genre_id');
    console.log(this.id)
    this.movieServie.movieGenre(Number(this.id)).subscribe(movie => {
      movie.forEach(mov=>{
        this.movieGenre.push(this.movieServie.movieById(mov));
      })
     
      this.pageSize= this.movieGenre.length/20
    this.page=1;
    this.loadItems()
    }) 
  }



  ngOnInit(): void {
  }


  async loadItems() {
   

    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;


    for (let index = startIndex; index < endIndex-1; index++) {
      this.moviePage.push(this.movieGenre[index]);
      
    }


  }
  onPageChange(page: number) {
    this.page = page;
    this.loadItems();
  }

}
