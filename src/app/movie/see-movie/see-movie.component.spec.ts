import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeMovieComponent } from './see-movie.component';

describe('SeeMovieComponent', () => {
  let component: SeeMovieComponent;
  let fixture: ComponentFixture<SeeMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
