import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { stringify } from 'qs'
import * as _ from 'lodash'
import { DataIndexedDbService } from '../indb/data-indexed-db.service'
import { BehaviorSubject } from 'rxjs'
import { ITxnSubject } from '../indb/index-db.service'
import * as moment from 'moment'
@Injectable({
  providedIn: 'root',
})
export class ReceiveTxnService {
  private syncUpTxn$ = new BehaviorSubject<ITxnSubject>({
    status: null,
    txnCount: null,
  })
  constructor(
    private http: HttpClient,
    private dataIndexedDbService: DataIndexedDbService,
  ) {}

  async updateStatusSync() {
    const number = await this.dataIndexedDbService.countRecords('receiveTxn')
    console.log('number :', number)
    this.updateStatus(number)
  }

  getSyncUpTxn$() {
    return this.syncUpTxn$.asObservable()
  }

  updateStatus(number?: number, isError = false) {
    if (number && isError) {
      this.syncUpTxn$.next({
        txnCount: number,
        status: 'ERRORR',
      })
    } else if (number > 0) {
      this.syncUpTxn$.next({
        txnCount: number,
        status: 'PROCESSING',
      })
    } else if (number == 0) {
      this.syncUpTxn$.next({
        txnCount: number,
        status: 'COMPLETED',
      })
    } else {
      this.syncUpTxn$.next({
        txnCount: null,
        status: 'ERRORR',
      })
    }
  }

  listReceiveTxns(params: any) {
    return this.http.get(`${environment.apiEndpointUrl}/receiveTxns`, {
      params: new HttpParams({
        fromString: stringify(params, { allowDots: true }),
      }),
    })
  }

  saveAsPromise = async (data, callback?) => {
    // const result = await this.http
    //   .post(environment.restEndpointUrl + '/receiveTxnSyncUp', {
    //     receiveTxns: [data],
    //   })
    //   .toPromise()
    // if (callback) {
    //   callback(result)
    // }
    // return result

    return this.http
      .post(environment.restEndpointUrl + '/receiveTxnSyncUp', {
        receiveTxns: [data],
      })
      .toPromise()

    // return this.http.post(environment.restEndpointUrl + '/receiveTxnSyncUp', {
    //   receiveTxns: [data],
    // })
  }

  createReceiveTxn(data) {
    const date = moment()
    return new Promise(async (resolve, reject) => {
      const id = this.dataIndexedDbService.addToStore('receiveTxn', {
        ...data,
        receivedDateTime: date.toISOString(),
        // receivedDate: date.format('YYYY-MM-DD'),
      })
      if (id) {
        const number = await this.dataIndexedDbService.countRecords(
          'receiveTxn',
        )
        this.updateStatus(number)
        resolve({ valid: true, data: id })
      } else {
        resolve({ valid: false, reason: 'Cannot insert' })
      }
    })
    // return this.indexDbService.addTxnIndexDb(data)
  }
}
