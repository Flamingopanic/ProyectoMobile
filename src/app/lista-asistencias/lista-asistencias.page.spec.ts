import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaAsistenciasPage } from './lista-asistencias.page';

describe('ListaAsistenciasPage', () => {
  let component: ListaAsistenciasPage;
  let fixture: ComponentFixture<ListaAsistenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAsistenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
