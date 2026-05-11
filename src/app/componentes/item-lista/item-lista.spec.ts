import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLista } from './item-lista';

describe('ItemLista', () => {
  let component: ItemLista;
  let fixture: ComponentFixture<ItemLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
