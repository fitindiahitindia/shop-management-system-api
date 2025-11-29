import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManageOrdersComponent } from './add-manage-orders.component';

describe('AddManageOrdersComponent', () => {
  let component: AddManageOrdersComponent;
  let fixture: ComponentFixture<AddManageOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManageOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManageOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
