import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoverInfoComponent } from './gover-info.component';

describe('GoverInfoComponent', () => {
  let component: GoverInfoComponent;
  let fixture: ComponentFixture<GoverInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoverInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoverInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
