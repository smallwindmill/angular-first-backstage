import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityManageComponent } from './community-manage.component';

describe('CommunityManageComponent', () => {
  let component: CommunityManageComponent;
  let fixture: ComponentFixture<CommunityManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
