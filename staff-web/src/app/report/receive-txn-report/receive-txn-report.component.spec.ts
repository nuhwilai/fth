import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveTxnReportComponent } from './receive-txn-report.component';

describe('ReceiveTxnReportComponent', () => {
  let component: ReceiveTxnReportComponent;
  let fixture: ComponentFixture<ReceiveTxnReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveTxnReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveTxnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
