import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { stringify } from 'qs'
@Injectable({
  providedIn: 'root',
})
export class ProductRoundService {
  constructor(
    private http: HttpClient,
    private dbService: NgxIndexedDBService,
  ) {}

  listProductRounds = (params: any) => {
    return this.http.get(`${environment.apiEndpointUrl}/productRounds`, {
      params: new HttpParams({
        fromString: stringify(params, { allowDots: true }),
      }),
    })
  }

  listProductRoundOffline = (params: any) => {
    return this.dbService.getAll('productRound')
  }

  createProductRound(params: any) {
    return this.http.post(`${environment.apiEndpointUrl}/productRounds`, params)
  }

  updateProductRound(id: string, params: any) {
    return this.http.put(
      `${environment.apiEndpointUrl}/productRounds/${id}`,
      params,
    )
  }

  deleteProductRound(id: string) {
    return this.http.delete(`${environment.apiEndpointUrl}/productRounds/${id}`)
  }
}
