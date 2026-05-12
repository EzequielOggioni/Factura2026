import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsError } from './forms-error';

describe('FormsError', () => {
  let component: FormsError;
  let fixture: ComponentFixture<FormsError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
