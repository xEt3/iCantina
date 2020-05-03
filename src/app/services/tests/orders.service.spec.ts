import { TestBed } from '@angular/core/testing';
import { OrdersService } from '../orders.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage';
import { NavController, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { environment } from '../../../environments/environment';

describe('OrdersService', () => {
  const url = environment.url;
  let service: OrdersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, IonicStorageModule.forRoot(), AppRoutingModule],
      providers: [
        { provide: OrdersService, useClass: OrdersService },
      ]
    })
    service = TestBed.get(OrdersService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: OrdersService = TestBed.get(OrdersService);
    expect(service).toBeTruthy();
  });


  it('should return my orders', async () => {
    // Arrange
    const mockResponse = {
      results: [
        {
          "ok": true,
          "orders": [
            {
              "done": false,
              "_id": "5eaec6354ae00a13d75498b1",
              "client": "5eaec6354ae00a13d7549884",
              "products": [
                {
                  "_id": "5eaec6354ae00a13d75498b2",
                  "product": "5eaec6354ae00a13d754988b",
                  "amount": 1
                },
                {
                  "_id": "5eaec6354ae00a13d75498b3",
                  "product": "5eaec6354ae00a13d754988b",
                  "amount": 1
                }
              ],
              "price": 24,
              "created": "2020-05-03T13:25:09.499Z",
              "__v": 0
            },
            {
              "done": false,
              "_id": "5eaec6354ae00a13d75498ae",
              "client": "5eaec6354ae00a13d7549884",
              "products": [
                {
                  "_id": "5eaec6354ae00a13d75498af",
                  "product": "5eaec6354ae00a13d754988b",
                  "amount": 1
                },
                {
                  "_id": "5eaec6354ae00a13d75498b0",
                  "product": "5eaec6354ae00a13d754988b",
                  "amount": 1
                }
              ],
              "price": 24,
              "created": "2020-05-03T13:25:09.499Z",
              "__v": 0
            }
          ]
        }
      ]
    };
    let dataError, dataResponse;
    let getMyOrders = await service.getMyOrders();
    getMyOrders.subscribe(data => {
      dataResponse = data
    })
    
    const req = httpMock.expectOne(`${url}/order/myOrders`);
    req.flush(mockResponse);
    // Assert
    console.log(dataResponse)
    expect(dataResponse.results.length).toEqual(1);
    expect(req.request.url).toEqual(`${url}/order/myOrders`);
    expect(req.request.method).toEqual('GET');
  });

  
});
