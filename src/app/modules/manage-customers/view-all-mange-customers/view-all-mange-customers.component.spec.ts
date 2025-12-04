import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllMangeCustomersComponent } from './view-all-mange-customers.component';

describe('ViewAllMangeCustomersComponent', () => {
  let component: ViewAllMangeCustomersComponent;
  let fixture: ComponentFixture<ViewAllMangeCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllMangeCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllMangeCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
