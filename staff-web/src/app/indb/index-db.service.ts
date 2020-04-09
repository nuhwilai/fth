import { Injectable } from '@angular/core'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import * as _ from 'lodash'
import { Subject } from 'rxjs'
import { stringify } from 'qs'
import * as moment from 'moment'
@Injectable({
  providedIn: 'root',
})
export class IndexDbService {
  private intervalInstance = null
  private intervalTime = 20000
  public txnCount$ = new Subject()
  constructor(
    private dbService: NgxIndexedDBService,
    private http: HttpClient,
  ) {
    this.initDb()
    this.runIndexDbService()
    this.dbService.count('recieveTxn').then((number) => {
      this.txnCount$.next(number)
    })
  }

  initDb() {
    this.addIndexDbToService()
    this.getServiceToIndexDb()
  }

  getTxnCount() {
    return this.txnCount$.asObservable()
  }

  async addTxnIndexDb(data) {
    try {
      await this.dbService.add('recieveTxn', data)
      const number = await this.dbService.count('recieveTxn')
      this.txnCount$.next(number)
    } catch (e) {}
  }

  runIndexDbService() {
    console.log('runIndexDbService')
    this.intervalInstance = setInterval(() => {
      this.addIndexDbToService()

      this.getServiceToIndexDb()
    }, this.intervalTime)
  }

  addIndexDbToService() {
    this.dbService.getAll('recieveTxn').then(
      (recieveTxn) => {
        if (_.isEmpty(recieveTxn)) {
          return
        }
        const newRecieveTxn = _.map(recieveTxn, (data) => _.omit(data, ['id']))
        this.http
          .post(environment.restEndpointUrl + '/receiveTxnSyncUp', {
            receiveTxns: newRecieveTxn,
          })
          .subscribe(
            (data) => {
              if (data) {
                console.log('save success')
                this.dbService.clear('recieveTxn').then(
                  () => {
                    console.log('clear :')
                    this.txnCount$.next(0)
                  },
                  (error) => {
                    console.log(error)
                  },
                )
              }
            },
            (error) => {
              this.txnCount$.next(newRecieveTxn.length)
            },
          )
      },
      (error) => {
        console.log(error)
      },
    )
  }

  getServiceToIndexDb() {
    this.http
      .get(environment.restEndpointUrl + '/productRounds', {
        params: new HttpParams({
          fromString: stringify({
            roundDateTime_gt: moment().startOf('day').toISOString(),
          }),
        }),
      })
      .subscribe((data: any) => {
        if (data && data.valid) {
          const productRoundsData = data.data.productRounds
          this.dbService.clear('productRound').then(
            () => {
              _.each(productRoundsData, (data) => {
                this.dbService.add('productRound', data)
              })
            },
            (error) => {
              console.log(error)
            },
          )
        }
      })
  }
}
