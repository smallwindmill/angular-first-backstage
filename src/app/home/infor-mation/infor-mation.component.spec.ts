/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InforMationComponent } from './infor-mation.component';

describe('InforMationComponent', () => {
  let component: InforMationComponent;
  let fixture: ComponentFixture<InforMationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InforMationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InforMationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
