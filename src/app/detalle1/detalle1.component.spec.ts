import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detalle1Component } from './detalle1.component';

describe('Detalle1Component', () => {
  let component: Detalle1Component;
  let fixture: ComponentFixture<Detalle1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detalle1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detalle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
