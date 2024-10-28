import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioAdministradorPage } from './usuario-administrador.page';

describe('UsuarioAdministradorPage', () => {
  let component: UsuarioAdministradorPage;
  let fixture: ComponentFixture<UsuarioAdministradorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAdministradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
