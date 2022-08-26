import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeDatosComponent } from './gestion-de-datos.component';

describe('GestionDeDatosComponent', () => {
  let component: GestionDeDatosComponent;
  let fixture: ComponentFixture<GestionDeDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDeDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDeDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
