import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerramientaDeAnalisisComponent } from './herramienta-de-analisis.component';

describe('HerramientaDeAnalisisComponent', () => {
  let component: HerramientaDeAnalisisComponent;
  let fixture: ComponentFixture<HerramientaDeAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerramientaDeAnalisisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HerramientaDeAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
