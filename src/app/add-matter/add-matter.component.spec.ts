import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatterComponent } from './add-matter.component';

describe('AddMatterComponent', () => {
  let component: AddMatterComponent;
  let fixture: ComponentFixture<AddMatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
