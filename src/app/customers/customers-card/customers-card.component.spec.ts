import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CustomersCardComponent } from './customers-card.component';

import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TrackByService } from '../../core/services/trackby.service';
import { customers } from '../../shared/mocks';

import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { TrimPipe } from '../../shared/pipes/trim.pipe';

describe('CustomersCardComponent', () => {
  let component: CustomersCardComponent;
  let fixture: ComponentFixture<CustomersCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [
        CustomersCardComponent, CapitalizePipe, TrimPipe
      ],
      providers: [ TrackByService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersCardComponent);
    component = fixture.componentInstance;
    component.customers = JSON.parse(JSON.stringify(customers));
    fixture.detectChanges();
  });
  
  it(`(1.d) Longer name of the customer should show grow to the second row on the name bar'`, async(() => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-header').style.getPropertyValue('word-break')).toBe('break-all');
  }));
  /*
  it(`(1.e) If there are two customers with the same name, jump out should navigate to the correct current customer'`, async(() => {

  }));  
  */
  
});

