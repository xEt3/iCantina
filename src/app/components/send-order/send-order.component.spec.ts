import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendOrderComponent } from './send-order.component';

describe('SendOrderComponent', () => {
  let component: SendOrderComponent;
  let fixture: ComponentFixture<SendOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendOrderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
