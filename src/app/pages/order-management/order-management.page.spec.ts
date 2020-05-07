import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderManagementPage } from './order-management.page';

describe('OrderManagementPage', () => {
  let component: OrderManagementPage;
  let fixture: ComponentFixture<OrderManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
