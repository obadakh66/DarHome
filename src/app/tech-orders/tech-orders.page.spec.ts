import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechOrdersPage } from './tech-orders.page';

describe('TechOrdersPage', () => {
  let component: TechOrdersPage;
  let fixture: ComponentFixture<TechOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechOrdersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
