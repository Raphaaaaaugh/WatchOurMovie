import { Component, OnInit } from '@angular/core';
import { Speciality } from '../type/types';
import { PlaningService } from '../service/planing.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';


@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.css'],
})
export class SpecialityComponent implements OnInit {
  Spes: Speciality [] = [];
  constructor( private planingserv : PlaningService  ) { }

  ngOnInit(): void {
    this.planingserv.getSpecialities().subscribe((data:Speciality []) => {
      this.Spes = data;
    })
  }

}
