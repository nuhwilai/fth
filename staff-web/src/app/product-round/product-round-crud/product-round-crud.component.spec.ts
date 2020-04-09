import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRoundCrudComponent } from './product-round-crud.component';

describe('ProductRoundCrudComponent', () => {
  let component: ProductRoundCrudComponent;
  let fixture: ComponentFixture<ProductRoundCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRoundCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRoundCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
