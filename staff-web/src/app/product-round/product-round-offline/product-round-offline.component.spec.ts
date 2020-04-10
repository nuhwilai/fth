import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRoundOfflineComponent } from './product-round-offline.component';

describe('ProductRoundOfflineComponent', () => {
  let component: ProductRoundOfflineComponent;
  let fixture: ComponentFixture<ProductRoundOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRoundOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRoundOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
