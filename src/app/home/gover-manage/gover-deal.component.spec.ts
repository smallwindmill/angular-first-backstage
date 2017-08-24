import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoverDealComponent } from './gover-deal.component';

describe('GoverDealComponent', () => {
  let component: GoverDealComponent;
  let fixture: ComponentFixture<GoverDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoverDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoverDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
