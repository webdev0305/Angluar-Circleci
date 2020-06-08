import { TestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICustomer, IState } from '../../shared/interfaces';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';


import { CustomerEditComponent } from './customer-edit.component';
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
  'orders': [],
  'latitude': 33.299,
  'longitude': -111.963
};   

describe('CustomerEditComponent', () => {
  let component: CustomerEditComponent;
  let fixture: ComponentFixture<CustomerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [
        CustomerEditComponent, GrowlerComponent
      ],
      providers: [ DataService, ModalService, GrowlerService, LoggerService ]
    }).overrideComponent(CustomerEditComponent, {
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
    fixture = TestBed.createComponent(CustomerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it(`(4.a.i-v) The added information should be shown`, async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(fixture.debugElement.nativeElement.querySelector('#firstName')).toBeTruthy(); 
      })
  }));

  it(`(4.a.vi) Mandatory validation for all the fields`, async(() => {
    component.customer.firstName = '';
    component.customer.lastName = '';
    component.customer.address = '';
    component.customer.city = '';
    component.customer.state.abbreviation = '';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.alert-danger')).toBeTruthy();
    });
  }));

  it(`(4.a.vii) If after adding, the values are removed, it should show the validation again`, async(() => {
    /*spyOn(component, 'submit');
    const btn = fixture.debugElement.query(By.css('.btn-success'));*/
    component.customer = customer;
    component.customer.id = 0;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.customerForm.valid).toBeTruthy();
      component.submit();
      component.customer.firstName = '';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.customerForm.valid).toBeFalsy();
      });
    });
  }));
  
  it(`(4.a.viii) Adding space for any field should not be taken as value and the validation should still hold`, async(() => {
    component.customer = customer;
    component.customer.lastName = ' ';    
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.alert-danger')).toBeTruthy();
    });
  }));   
  
  it(`(4.b.1) On failure 1. Should show a notification on failure and stay on the same page`, async(() => {
    component.customer = customer;
    component.customer.id = 0;
    component.submit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.errorMessage).toBe('Unable to add the customer');
    });
  }));  

  it(`(5.a) Customer record should not be edited if fields are not in valid format`, async(() => {
    component.customer = customer;
    component.customer.id = 1000;
    component.submit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.errorMessage).toBe('Unable to update the customer');
    });
  }));
  
  it(`(5.b) The updated information should be shown`, async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('#firstName')).toBeTruthy(); 
    })
  }));  

  it(`(5.c.i)  Delete option - Should remove that contact entry in the database for the list of customers`, async(() => {
    customer.id = 5;
    dataService.deleteCustomer(customer.id).subscribe((status: boolean) => {
      expect(status).toBe(true);
    }); 
  })); 
  
  it(`(5.c.ii.1) Delete option - On failure - Should show a notification on failure and stay on the same page`, async(() => {
    component.customer = customer;
    component.customer.id = 0;
    dataService.deleteCustomer(customer.id).subscribe((status: boolean) => {
      expect(fixture.debugElement.nativeElement.querySelector('.alert-danger')).toBeTruthy();
    }); 
  }));    
});