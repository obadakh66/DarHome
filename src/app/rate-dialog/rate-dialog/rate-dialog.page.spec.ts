import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateDialogPage } from './rate-dialog.page';

describe('RateDialogPage', () => {
  let component: RateDialogPage;
  let fixture: ComponentFixture<RateDialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateDialogPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
