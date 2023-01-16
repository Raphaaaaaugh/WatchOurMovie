import { Component, OnInit } from '@angular/core';
import { PlaningService } from '../service/planing.service';
import { Matter } from '../type/types';
@Component({
  selector: 'app-matter',
  templateUrl: './matter.component.html',
  styleUrls: ['./matter.component.css']
})
export class MatterComponent implements OnInit {

  matt: Matter [] = [];
  constructor( private planingserv : PlaningService  ) { }

  ngOnInit(): void {
    this.planingserv.getMatters().subscribe((data:Matter []) => {
      this.matt = data;
      console.log(this.matt ,"Matt here");
    })
 
  }
 
}
