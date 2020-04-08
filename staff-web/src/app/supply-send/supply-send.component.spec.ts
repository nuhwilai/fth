import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplySendComponent } from './supply-send.component';

describe('SupplySendComponent', () => {
  let component: SupplySendComponent;
  let fixture: ComponentFixture<SupplySendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplySendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplySendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
