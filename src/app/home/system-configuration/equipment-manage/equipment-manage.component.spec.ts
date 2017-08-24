import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentManageComponent } from './equipment-manage.component';

describe('EquipmentManageComponent', () => {
  let component: EquipmentManageComponent;
  let fixture: ComponentFixture<EquipmentManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
