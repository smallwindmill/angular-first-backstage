import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaveResidentComponent } from './have-resident.component';

describe('HaveResidentComponent', () => {
  let component: HaveResidentComponent;
  let fixture: ComponentFixture<HaveResidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaveResidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaveResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
