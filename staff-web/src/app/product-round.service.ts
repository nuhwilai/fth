import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({
  providedIn: 'root',
})
export class ProductRoundService {
  constructor(private dbService: NgxIndexedDBService) {}

  listProduct() {
    return new Observable((sub) => {
      sub.next([
        {
          id: 1,
          productName: 'product1',
          roundDateTime: '2018-01-01',
        },
        {
          id: 2,
          productName: 'product2',
          roundDateTime: '2018-01-03',
        },
        {
          id: 3,
          productName: 'product3',
          roundDateTime: '2018-01-10',
        },
        {
          id: 4,
          productName: 'product4',
          roundDateTime: '2018-01-11',
        },
      ])
    })
  }

  createProduct(data) {}

  updateProduct(id, data) {}

  deleteProduct(id) {}
}
