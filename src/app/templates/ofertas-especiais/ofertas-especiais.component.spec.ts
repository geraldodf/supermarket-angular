import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasEspeciaisComponent } from './ofertas-especiais.component';

describe('OfertasEspeciaisComponent', () => {
  let component: OfertasEspeciaisComponent;
  let fixture: ComponentFixture<OfertasEspeciaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertasEspeciaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasEspeciaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
