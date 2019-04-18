import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabContactoComponent } from './tab-contacto.component';

describe('TabContactoComponent', () => {
  let component: TabContactoComponent;
  let fixture: ComponentFixture<TabContactoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabContactoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
