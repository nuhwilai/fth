import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ProductRoundService {
  constructor() {}

  listProduct() {
    return new Observable((sub) => {
      sub.next([
        {
          id: 1,
          title: 'product1',
          date: '2018-01-01',
        },
        {
          id: 2,
          title: 'product2',
          date: '2018-01-03',
        },
        {
          id: 3,
          title: 'product3',
          date: '2018-01-10',
        },
        {
          id: 4,
          title: 'product4',
          date: '2018-01-11',
        },
      ])
    })
  }

  createProduct() {}

  updateProduct() {}

  deleteProduct() {}
}
