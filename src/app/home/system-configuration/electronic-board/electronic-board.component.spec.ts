import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicBoardComponent } from './electronic-board.component';

describe('ElectronicBoardComponent', () => {
  let component: ElectronicBoardComponent;
  let fixture: ComponentFixture<ElectronicBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
