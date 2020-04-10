import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ProductSendComponent } from './product-send.component'

describe('ProductSendComponent', () => {
  let component: ProductSendComponent
  let fixture: ComponentFixture<ProductSendComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSendComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSendComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
