import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MapComponent } from './map.component';

import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [
        MapComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it(`(2.a) The user should be able to expand the map to full screen`, async(() => {
    expect(component.fullscreenControl).toBe(true);
  }));
  /*  
  it(`(2.b) If the city is not added correctly, it should show a message over the grayed out map - The added location cannot be found`, async(() => {
  }));*/
});

