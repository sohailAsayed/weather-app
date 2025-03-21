import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDisplayComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapDisplayComponent;
  let fixture: ComponentFixture<MapDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
