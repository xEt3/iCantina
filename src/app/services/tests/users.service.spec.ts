import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage';
import { NavController, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { environment } from '../../../environments/environment';
import { UserService } from '../user.service';

describe('UserService', () => {
  const url = environment.url;
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, IonicStorageModule.forRoot(), AppRoutingModule],
      providers: [
        { provide: UserService, useClass: UserService },
      ]
    })
    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });


  it('should register user', async () => {
    // Arrange
    const mockResponse = {
      "ok": true,
      "token": 'jooo'
    };

    let dataError, dataResponse;
    const req = httpMock.expectOne(`${url}/user/create`);
    req.flush(mockResponse);
    dataResponse= await service.register({mail:'nacho',name:'nacho',password:'123456'});
 console.log(dataResponse)

    // Assert
    console.log(dataResponse)
    expect(dataResponse).toBeTruthy()
    expect(req.request.url).toEqual(`${url}/order/myOrders`);
    expect(req.request.method).toEqual('POST');
  });


});
