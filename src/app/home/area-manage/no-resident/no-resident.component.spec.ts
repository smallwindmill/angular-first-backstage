import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoResidentComponent } from './no-resident.component';

describe('NoResidentComponent', () => {
  let component: NoResidentComponent;
  let fixture: ComponentFixture<NoResidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoResidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
