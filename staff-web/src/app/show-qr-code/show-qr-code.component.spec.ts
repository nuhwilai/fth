import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQrCodeComponent } from './show-qr-code.component';

describe('ShowQrCodeComponent', () => {
  let component: ShowQrCodeComponent;
  let fixture: ComponentFixture<ShowQrCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowQrCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
