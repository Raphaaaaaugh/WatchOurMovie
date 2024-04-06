import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngieComponent } from './engie.component';

describe('EngieComponent', () => {
  let component: EngieComponent;
  let fixture: ComponentFixture<EngieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
