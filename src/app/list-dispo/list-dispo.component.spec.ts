import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDispoComponent } from './list-dispo.component';

describe('ListDispoComponent', () => {
  let component: ListDispoComponent;
  let fixture: ComponentFixture<ListDispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDispoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
