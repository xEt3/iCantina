import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemDeliveryDataComponent } from './item-delivery-data.component';

describe('ItemDeliveryDataComponent', () => {
  let component: ItemDeliveryDataComponent;
  let fixture: ComponentFixture<ItemDeliveryDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDeliveryDataComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDeliveryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
