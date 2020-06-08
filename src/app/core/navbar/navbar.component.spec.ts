import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';

import { RouterModule, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '../services/auth.service';
import { GrowlerService } from '../growler/growler.service';

import { MockAuthService } from '../../shared/mocks';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: MockAuthService;
  let growlerService: GrowlerService;

  beforeEach(async(() => {
    authService = new MockAuthService();    
    TestBed.configureTestingModule({
      imports: [ RouterModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [
        NavbarComponent
      ],
      providers: [ { provide: AuthService, useValue: authService },
        { provide: GrowlerService, useValue: growlerService } ]
}).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it(`1.a.i should have as app title 'Customer Manager'`, async(() => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.app-title').textContent).toEqual('Customer Manager');
  }));

  it(`1.a.iii.1 should have a link to Customers page`, async(() => {
    const debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    const index = debugElements.findIndex(de => {
      return de.properties['href'] === '/customers';
    });
    expect(index).toBeGreaterThan(-1);
  }));

  it(`1.a.iii.2 should have a link to Orders page`, async(() => {
    const debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    const index = debugElements.findIndex(de => {
      return de.properties['href'] === '/orders';
    });
    expect(index).toBeGreaterThan(-1);
  }));
/*
  it(`should have a link to Login page`, async(() => {
    const debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    const index = debugElements.findIndex(de => {
      return de.properties['href'] === '/login';
    });
    expect(index).toBeGreaterThan(-1);
  }));*/
});