import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListadoComponent } from './item-listado.component';

describe('ItemListadoComponent', () => {
  let component: ItemListadoComponent;
  let fixture: ComponentFixture<ItemListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
