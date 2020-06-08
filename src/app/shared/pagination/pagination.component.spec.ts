import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PaginationComponent } from './pagination.component';

import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { customers } from '../mocks';
import { updateBinding } from '@angular/core/src/render3/instructions';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [
        PaginationComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.pageSize = 10;
    component.totalItems = 21;
    fixture.detectChanges();
  });
  /*
  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));*/

  it(`(1.f) If a customer has been removed and there were 21/31/...customers, the last paginated page should be removed in the footer`, async(() => {
    component.totalItems--;
    expect(component.totalPages).toEqual(2);
  }));
  
});

