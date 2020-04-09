import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestQrCodeComponent } from './request-qr-code.component';

describe('RequestQrCodeComponent', () => {
  let component: RequestQrCodeComponent;
  let fixture: ComponentFixture<RequestQrCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestQrCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
