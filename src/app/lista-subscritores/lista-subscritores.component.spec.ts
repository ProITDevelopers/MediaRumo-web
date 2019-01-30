import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSubscritoresComponent } from './lista-subscritores.component';

describe('ListaSubscritoresComponent', () => {
  let component: ListaSubscritoresComponent;
  let fixture: ComponentFixture<ListaSubscritoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSubscritoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSubscritoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
