import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoverWaitComponent } from './gover-wait.component';

describe('GoverWaitComponent', () => {
  let component: GoverWaitComponent;
  let fixture: ComponentFixture<GoverWaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoverWaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoverWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
