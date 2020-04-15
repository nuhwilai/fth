import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { IndexDbService } from '../indb/index-db.service'
import { stringify } from 'qs'
import { DataIndexedDbService } from '../indb/data-indexed-db.service'
import { SyncableDataService } from '../indb/syncable-data.service'
import * as _ from 'lodash'
@Injectable({
  providedIn: 'root',
})
export class ProductRoundService {
  constructor(
    private http: HttpClient,
    // private dbService: NgxIndexedDBService,
    private dataIndexedService: DataIndexedDbService,
    private syncableDataServie: SyncableDataService,
  ) {}

  listProductRounds = (params: any) => {
    return this.http.get(`${environment.apiEndpointUrl}/productRounds`, {
      params: new HttpParams({
        fromString: stringify(params, { allowDots: true }),
      }),
    })
  }

  listProductRoundOffline = (params: any) => {
    return this.dataIndexedService.list('productRound')
  }

  syncDownProductRound = async () => {
    try {
      const result: any = await this.listProductRounds({}).toPromise()
      const newResult = _.map(result.data.productRounds, (productRound) => {
        return { data: productRound }
      })
      await this.syncableDataServie.download('productRound', newResult)
      return Promise.resolve({ valid: true, data: newResult })
    } catch (e) {}

    // return this.indexDbService.reloadProductRound()
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
