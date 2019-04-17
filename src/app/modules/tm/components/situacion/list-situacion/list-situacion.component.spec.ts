import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSituacionComponent } from './list-situacion.component';

describe('ListSituacionComponent', () => {
  let component: ListSituacionComponent;
  let fixture: ComponentFixture<ListSituacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSituacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSituacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
