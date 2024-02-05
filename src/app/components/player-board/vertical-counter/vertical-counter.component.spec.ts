import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalCounterComponent } from './vertical-counter.component';

describe('VerticalCounterComponent', () => {
  let component: VerticalCounterComponent;
  let fixture: ComponentFixture<VerticalCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
