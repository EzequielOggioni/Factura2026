import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFacturas } from './admin-facturas';

describe('AdminFacturas', () => {
  let component: AdminFacturas;
  let fixture: ComponentFixture<AdminFacturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFacturas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFacturas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
