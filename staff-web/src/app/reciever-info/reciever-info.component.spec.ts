import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieverInfoComponent } from './reciever-info.component';

describe('RecieverInfoComponent', () => {
  let component: RecieverInfoComponent;
  let fixture: ComponentFixture<RecieverInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecieverInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecieverInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
