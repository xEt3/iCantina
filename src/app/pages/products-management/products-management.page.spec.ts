import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductsManagementPage } from './products-management.page';

describe('ProductsManagementPage', () => {
  let component: ProductsManagementPage;
  let fixture: ComponentFixture<ProductsManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
