import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMapComponent } from './general-map.component';

describe('GeneralMapComponent', () => {
  let component: GeneralMapComponent;
  let fixture: ComponentFixture<GeneralMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
