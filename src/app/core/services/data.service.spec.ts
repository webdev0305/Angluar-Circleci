import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICustomer, IPagedResults, IApiResponse } from '../../shared/interfaces';

import { DataService } from './data.service';

describe('DataService', () => {
  let injector: TestBed;
  let service: DataService;
  let httpMock: HttpTestingController;

  let customer: ICustomer = 
    {
      'id': 30,
      'firstName': 'Rostuk',
      'lastName': 'Lutsyk',
      'gender': 'male',
      'address': '1234 Anywhere St.',
      'city': ' Phoenix ',
      'state': {
          'abbreviation': 'AZ',
          'name': 'Arizona'
      },
      'orders': [],
      'latitude': 800, //33.299,
      'longitude': 1000, //-111.963
    };    

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DataService ]
    }).compileComponents();

    // inject the service
    injector = getTestBed();
    service = injector.get(DataService); 
    httpMock = injector.get(HttpTestingController);     
  }));
  
  /*it('should be created', () => {
    expect(service).toBeTruthy();
  });*/

  it(`(1.b) Customers list should show the latest added customer at the top`, async(() => {
   service.insertCustomer(customer)
      .subscribe((insertedCustomer: ICustomer) => {
        expect(insertedCustomer.firstName).toBe(customer.firstName);
      });

    const req = httpMock.expectOne(
      `http://localhost:8080/api/customers`,
      'post to api'
    );

    expect(req.request.method).toBe('POST');
    req.flush(customer);
    httpMock.verify();

    service.getCustomersPage(0, 10)
      .subscribe((customers: IPagedResults<ICustomer[]>) => {
        expect(customers.results[0].firstName).toBe(customer.firstName);
      });
  }));

  it(`(1.c) Edited customer should be added at the top`, async(() => {
    service.updateCustomer(customer)
       .subscribe((status: boolean) => {
         expect(status).toBe(true);
       });
 
    /*const req = httpMock.expectOne(
      `http://localhost:8080/api/customers`,
      'post to api'
    );

    expect(req.request.method).toBe('PUT');
    req.flush(customer);
    httpMock.verify();*/

    service.getCustomersPage(0, 10)
      .subscribe((customers: IPagedResults<ICustomer[]>) => {
        expect(customers.results[0].firstName).toBe(customer.firstName);
      });
   }));  

   it(`(1.g) Deleted customers should not be shown in this page`, async(() => {
    service.deleteCustomer(customer.id)
       .subscribe((status: boolean) => {
         expect(status).toBe(true);
       });
 
    /*const req = httpMock.expectOne(
      `http://localhost:8080/api/customers`,
      'post to api'
    );

    expect(req.request.method).toBe('DELETE');
    req.flush(customer);
    httpMock.verify();*/

    service.getCustomers()
      .subscribe((customers: ICustomer[]) => {
        expect(customers.includes(customer)).toBe(false);
      });
   }));    
});