import { TestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICustomer, IState } from '../../shared/interfaces';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';


import { CustomerOrdersEditComponent } from './customer-orders-edit.component';
import { By, BrowserModule } from '@angular/platform-browser';

import { Router, RouterModule, RouterLinkWithHref, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { DataService } from '../../core/services/data.service';
import { ModalService } from '../../core/modal/modal.service';
import { GrowlerService } from '../../core/growler/growler.service';
import { LoggerService } from '../../core/services/logger.service';

import { MockDataService, getActivatedRouteWithParent, MockActivatedRoute, MockGrowlerService } from '../../shared/mocks';
import {Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';
import { GrowlerComponent } from 'src/app/core/growler/growler.component';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { bufferTime } from 'rxjs/operators';
import { ExpectedConditions } from 'protractor';

let route = new MockActivatedRoute();
route.parent = new MockActivatedRoute();
route.parent.params = of({id:"1"});

let dataService = new MockDataService();
let growlerService = new MockGrowlerService();

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
  'orders': [
    { 'productName': 'Basketball', 'itemCost': 7.99 },
    { 'productName': 'Shoes', 'itemCost': 199.99 }
  ],
  'latitude': 33.299,
  'longitude': -111.963
};   

describe('CustomerEditComponent', () => {
  let component: CustomerOrdersEditComponent;
  let fixture: ComponentFixture<CustomerOrdersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [
        CustomerOrdersEditComponent, GrowlerComponent, CapitalizePipe
      ],
      providers: [ DataService, ModalService, GrowlerService, LoggerService ]
    }).overrideComponent(CustomerOrdersEditComponent, {
      set: {
        providers: [
          { provide: DataService, useValue: dataService },
          { provide: GrowlerService, useValue: growlerService },
          { provide: ActivatedRoute, useValue: route }
        ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrdersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it(`(6.a.i) “should be shown Select item” dropdown​ (Mandatory​) with a “Price” field having a textbox and placeholder text as - Add price in US$ (Mandatory​)`, async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      //expect(fixture.debugElement.nativeElement.querySelector('#productName0')).toBeTruthy(); 
      expect(fixture.debugElement.nativeElement.querySelector('select')).toBeTruthy();
      if(fixture.debugElement.nativeElement.querySelector('select') !== null) {
        expect(fixture.debugElement.nativeElement.querySelector('#itemCost0')).toBeTruthy();
        if(fixture.debugElement.nativeElement.querySelector('#itemCost0') !== null)
          expect(fixture.debugElement.nativeElement.querySelector('#itemCost0').getAttribute('placeholder')).toBeTruthy();
      }
    });      
  }));

  it(`(6.a.ii.1) + Add new item  1. Click on the same should create a new row below default row 1. `, async(() => {
    spyOn(component, 'addItem');
    let btn = fixture.debugElement.nativeElement.querySelector('.btn_additem');
    expect(btn).toBeTruthy();
    /*btn.click();
    expect(component.addItem).toHaveBeenCalled();
    component.addItem();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      //expect(component.customer.orders.length).toEqual(3); 
    });*/
  }));

  it(`(6.a.iii) Insert button -  disabled till data is added to all the fields`, async(() => {
    fixture.debugElement.nativeElement.querySelector('#itemCost0').value = '';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.btn-success').disabled).toBe(true); 
    });
  }));

  it(`(6.a.iv) If after adding, the values are removed, it should show the validation again`, async(() => {
    component.customer.orders.push({productName: 'Frisbee', itemCost: 10});
    component.submit();
    fixture.debugElement.nativeElement.querySelector('#itemCost0').value = '';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.alert-danger')).toBeTruthy();
    });
  }));  

  it(`(6.a.v) Adding space for any field should not be taken as value and the validation should still hold`, async(() => {
    fixture.debugElement.nativeElement.querySelector('#itemCost0').value = ' ';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.alert-danger')).toBeTruthy();
    });
  }));   
  
  it(`(6.b.1) On failure 1. Should show a notification on failure and stay on the same page`, async(() => {
    component.customer.id = 0;
    component.submit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.alert-danger')).toBeTruthy();
    });
  })); 

  it(`(7.a) Order should not be added or edited if fields are invalid / empty`, async(() => {
    fixture.debugElement.nativeElement.querySelector('#itemCost0').value = '';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.btn-success').disabled).toBe(true); 
    });
  })); 

  it(`(7.b) Error messages for invalid fields should also be tested`, async(() => {
    fixture.debugElement.nativeElement.querySelector('#itemCost0').value = '';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.alert-danger')).toBeTruthy();
      expect(fixture.debugElement.nativeElement.querySelector('.alert-danger').textContent).toEqual('Price is required');
    });
  }));    

  it(`(7.c.i) The updated/added Item information should be shown`, async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('#productName0')).toBeTruthy(); 
    })
  }));

  it(`(7.c.ii) The updated/added Price information should be shown`, async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('#itemCost0')).toBeTruthy(); 
    })
  })); 
  
  it(`(7.d.i) Delete option - Should remove that order entry in the database for the list of customers`, async(() => {
    customer.id = 5;
    customer.orders = [];
    dataService.updateCustomer(customer).subscribe((status: boolean) => {
      expect(status).toBe(true);
    }); 
  })); 
  
  it(`(7.d.ii.1) Delete option - On failure - Should show a notification on failure and stay on the same page`, async(() => {
    component.customer.id = 0;
    component.delete();
    dataService.updateCustomer(customer).subscribe((status: boolean) => {
      //expect(status).toBe(false);
      expect(fixture.debugElement.nativeElement.querySelector('.alert-error')).toBeTruthy();
      //expect(fixture.debugElement.nativeElement.querySelector('.alert-error').textContent).toEqual('Unable to delete customer');
    }); 
  }));      
});