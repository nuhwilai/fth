import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRoundReportComponent } from './product-round-report.component';

describe('ProductRoundReportComponent', () => {
  let component: ProductRoundReportComponent;
  let fixture: ComponentFixture<ProductRoundReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRoundReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRoundReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
