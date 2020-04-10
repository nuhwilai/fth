import { Injectable, OnDestroy } from '@angular/core'
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
export class IndexDbService implements OnDestroy {
  private intervalInstance = null
  private intervalTime = 20000
  public txnCount$ = new Subject()
  constructor(
    private dbService: NgxIndexedDBService,
    private http: HttpClient,
  ) {
    this.checkDb()
  }

  initDb() {
    this.getServiceToIndexDb()
  }

  checkDb() {
    Promise.all([
      this.dbService.getAll('recieveTxn'),
      this.dbService.getAll('productRound'),
    ])
      .then(() => {
        this.runIndexDbService()
        this.dbService.count('recieveTxn').then((number) => {
          this.txnCount$.next(number)
        })
      })
      .catch((e) => {
        this.dbService.deleteDatabase().then(
          () => {
            window.location.reload()
          },
          (error) => {
            console.log(error)
          },
        )
      })
  }

  ngOnDestroy() {
    this.unRegisterDbService()
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
    this.intervalInstance = setInterval(() => {
      this.addIndexDbToService()

      this.getServiceToIndexDb()
    }, this.intervalTime)
  }

  unRegisterDbService() {
    clearInterval(this.intervalInstance)
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
            roundDateTime_gt: moment()
              .subtract('days', 7)
              .startOf('day')
              .toISOString(),
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
