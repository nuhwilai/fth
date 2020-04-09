import { Component, OnInit } from '@angular/core'
import { ProductRoundService } from '../product-round.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  displayDialog: boolean

  product: any = {}

  selectedProduct: any

  newProduct: boolean

  products: any[]

  cols: any[]

  constructor(private productRoundService: ProductRoundService) {}

  ngOnInit() {
    this.productRoundService
      .listProduct()
      .subscribe((product: any) => (this.products = product))

    this.cols = [
      { field: 'productName', header: 'Product Name' },
      { field: 'roundDateTime', header: 'Date Time' },
    ]
  }

  showDialogToAdd() {
    this.newProduct = true
    this.product = {}
    this.displayDialog = true
  }

  save() {
    if (this.newProduct) {
      this.productRoundService.createProduct(this.product)
    } else {
      this.productRoundService.updateProduct(this.product.id, this.product)
    }
    this.product = null
    this.displayDialog = false
  }

  delete() {
    this.productRoundService.deleteProduct(this.selectedProduct.id)
  }

  onRowSelect(event) {
    this.newProduct = false
    this.product = this.cloneCar(event.data)
    this.displayDialog = true
  }

  cloneCar(c: any): any {
    let car = {}
    for (let prop in c) {
      car[prop] = c[prop]
    }
    return car
  }
}
