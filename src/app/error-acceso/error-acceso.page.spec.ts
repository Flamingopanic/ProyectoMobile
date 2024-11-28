import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorAccesoPage } from './error-acceso.page';

describe('ErrorAccesoPage', () => {
  let component: ErrorAccesoPage;
  let fixture: ComponentFixture<ErrorAccesoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorAccesoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
