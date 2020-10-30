import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericCalcComponent } from './generic-calc.component';

describe('GenericCalcComponent', () => {
  let component: GenericCalcComponent;
  let fixture: ComponentFixture<GenericCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
