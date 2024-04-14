import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/service/movies.service';
import { UserService } from 'src/app/service/user.service';
import { Movie, User, Users } from 'src/app/type/types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-see-movie',
  templateUrl: './see-movie.component.html',
  styleUrls: ['./see-movie.component.css']
})
export class SeeMovieComponent implements OnInit {


  seeMovie:Array<Movie>=[];
  users:Array<User>=[];
  moviePage:Array<Movie>=[];
  pageSize:number=0;
  page:number=1;
  filteredItems: Array<User> = [];
  searchTerm: string = '';
  userSelected = new Map();
  userIsSelected=false;

  constructor(public movieServie: MoviesService,private router: Router,userService: UserService) {
   


    const token =  sessionStorage.getItem('token');
    if (!token) {
       this.router.navigateByUrl('/home');
       Swal.fire('echec Connexion ', 'veuillez vous connecter', 'error');
     }else{
      this.filteredItems = [...this.users];
   
 

    userService.getUser().subscribe(users => {
      console.log(users)
      this.users=users;
      console.log(this.users)
    })
    
   }
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

  filterItems(search:any) {
    if (search.value) {
      this.filteredItems = this.users.filter(item =>
        item.email.toLowerCase().includes(search.value.toLowerCase())
      );
    }else if(search.length<=20){
      console.log(search)
      this.filteredItems = this.users.filter(item =>
        item.email.toLowerCase().includes(search.toLowerCase())
      );
    }else{
      this.filteredItems = [];
    }
   
  }

  select(name:string) {
   
    this.userIsSelected=false
    this.filteredItems.forEach(item=>{
      if (item.color=='green') {
        this.userIsSelected=true
      }
    
    })
    this.filterItems(name)
    this.filteredItems.forEach(item=>{
      if (item.color) {
        item.color=''
          this.userSelected.set(item.email,item.color)
          console.log(this.userSelected.get(item.email))
      }else{
        item.color='green'
        
        this.userSelected.set(item.email,item.color)
        console.log(this.userSelected.get(item.email))
      }
    }
      
      )
    }





    submit(){
      const userList: string = '?list_users=John&list_users=Jane&list_users=Jax&list_users=Garen&list_users=Darius&list_users=Pornn&list_users=Jean'
      const listUser: Array<string> = [];
      for (let key of this.userSelected.keys()) {
          listUser.push(`list_users=${encodeURIComponent(key)}`);
      }
      
      const queryString = listUser.join('&');
      const finalString = `?${queryString}`;


      this.movieServie.getMovieToSee(finalString).subscribe((movie: any) => {
        console.log(movie)
        this.seeMovie=movie;
        this.pageSize= this.seeMovie.length/20
      this.page=1;
     console.log(this.seeMovie)
      this.loadItems()
      })
    }


}
