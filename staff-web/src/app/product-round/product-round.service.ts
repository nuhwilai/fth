import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class ProductRoundService {
  constructor(private http: HttpClient) {}

  // productRounds: IProductRound[] = [
  //   {
  //     _id: '1',
  //     productName: 'product1',
  //     roundDateTime: new Date(),
  //   },
  //   {
  //     _id: '2',
  //     productName: 'product2',
  //     roundDateTime: new Date(),
  //   },
  //   {
  //     _id: '3',
  //     productName: 'product3',
  //     roundDateTime: new Date(),
  //   },
  //   {
  //     _id: '4',
  //     productName: 'product4',
  //     roundDateTime: new Date(),
  //   },
  // ]

  // productRoundSuccessData: IProductRoundSuccessData = {
  //   productRounds: this.productRounds,
  // }

  listProductRounds = (params: any) => {
    return this.http.get(`http://localhost:8000/api/productRounds`, {})
    // return new Observable<IProductRoundSuccessData>((sub) => {
    //   sub.next(this.productRoundSuccessData)
    // })
  }

  createProductRound(data: any): Observable<ICreateProductRoundSuccessData> {
    return new Observable((sub) => {
      sub.next({ _id: '1' })
    })
  }

  updateProductRound(
    id: any,
    data: any,
  ): Observable<IUpdateProductRoundSuccessData> {
    return new Observable((sub) => {
      sub.next({ _id: '1' })
    })
  }

  deleteProductRound(id: any): Observable<IDeleteProductRoundSuccessData> {
    return new Observable((sub) => {
      sub.next({ _id: '1' })
    })
  }
}
