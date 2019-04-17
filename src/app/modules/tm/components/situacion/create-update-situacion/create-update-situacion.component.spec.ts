import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSituacionComponent } from './create-update-situacion.component';

describe('CreateUpdateSituacionComponent', () => {
  let component: CreateUpdateSituacionComponent;
  let fixture: ComponentFixture<CreateUpdateSituacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateSituacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateSituacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
