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
      { field: 'title', header: 'Title' },
      { field: 'date', header: 'Date' },
    ]
  }

  showDialogToAdd() {
    this.newProduct = true
    this.product = {}
    this.displayDialog = true
  }

  save() {
    let products = [...this.products]
    if (this.newProduct) products.push(this.product)
    else products[this.products.indexOf(this.selectedProduct)] = this.product

    this.products = products
    this.product = null
    this.displayDialog = false
  }

  delete() {
    let index = this.products.indexOf(this.selectedProduct)
    this.products = this.products.filter((val, i) => i != index)
    this.product = null
    this.displayDialog = false
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
