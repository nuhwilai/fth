import { Injectable, OnDestroy } from '@angular/core'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import * as _ from 'lodash'
import { Subject, BehaviorSubject } from 'rxjs'
import { stringify } from 'qs'
import * as moment from 'moment'
import { AuthService, AuthData } from '../auth/auth.service'
import { takeUntil } from 'rxjs/operators'

export type ITxnSubjectStatus = 'COMPLETED' | 'PROCESSING' | 'ERRORR'
export interface ITxnSubject {
  status: ITxnSubjectStatus | null
  txnCount: number | null
}
@Injectable({
  providedIn: 'root',
})
export class IndexDbService implements OnDestroy {
  unsubscribe$ = new Subject()
  private intervalInstance = null
  private intervalTime = 15000
  private syncUpTxn$ = new BehaviorSubject<ITxnSubject>({
    status: null,
    txnCount: null,
  })
  isAuth = false

  authData = {}
  constructor(
    // private dbService: NgxIndexedDBService,
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.authService.authData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((auth: AuthData) => {
        this.isAuth = auth.isAuthenticated
        this.authData = auth
      })
  }

  initDb() {
    this.getServiceToIndexDb()
  }

  run() {
    // this.dbService
    //   .count('recieveTxn')
    //   .then((number) => {
    //     this.runIndexDbService()
    //     this.updateStatus(number)
    //   })
    //   .catch((e) => {
    //     if (e.includes('objectStore does not exists')) {
    //       this.dbService.deleteDatabase().then(
    //         () => {
    //           window.location.reload()
    //         },
    //         (error) => {
    //           console.log(error)
    //         },
    //       )
    //     }
    //   })
  }

  ngOnDestroy() {
    this.unRegisterDbService()
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

  getSyncUpTxn$() {
    return this.syncUpTxn$.asObservable()
  }

  async addTxnIndexDb(data) {
    // try {
    //   const date = moment()
    //   return this.dbService
    //     .add('recieveTxn', {
    //       ...data,
    //       receivedDateTime: date.toISOString(),
    //       receivedDate: date.format('YYYY-MM-DD'),
    //     })
    //     .then(async () => {
    //       const number = await this.dbService.count('recieveTxn')
    //       this.updateStatus(number)
    //       const result: any = {
    //         valid: true,
    //       }
    //       return Promise.resolve(result)
    //     })
    // } catch (e) {
    //   this.updateStatus(null, true)
    //   const result: any = {
    //     valid: false,
    //     reason: e.message,
    //   }
    //   return Promise.resolve(result)
    // }
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
    if (!this.authService.isGranted(['ADMIN', 'STAFF'])) {
      return
    }
    // this.dbService.getAll('recieveTxn').then(
    //   (recieveTxn) => {
    //     if (_.isEmpty(recieveTxn)) {
    //       return
    //     }
    //     const newRecieveTxn = _.map(recieveTxn, (data) => _.omit(data, ['id']))
    //     this.http
    // .post(environment.restEndpointUrl + '/receiveTxnSyncUp', {
    //   receiveTxns: newRecieveTxn,
    // })
    //       .subscribe(
    //         (data: any) => {
    //           if (data && data.valid) {
    //             console.log('save success')
    //             this.dbService.clear('recieveTxn').then(
    //               () => {
    //                 console.log('clear :')
    //                 this.updateStatus(0)
    //               },
    //               (error) => {
    //                 console.log(error)
    //               },
    //             )
    //           } else {
    //             this.updateStatus(newRecieveTxn.length, true)
    //           }
    //         },
    //         (error) => {
    //           this.updateStatus(newRecieveTxn.length, true)
    //         },
    //       )
    //   },
    //   (error) => {
    //     console.log(error)
    //   },
    // )
  }

  getServiceToIndexDb() {
    if (!this.authService.isGranted(['ADMIN', 'STAFF'])) {
      return
    }
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
          // this.dbService.clear('productRound').then(
          //   () => {
          //     _.each(productRoundsData, (data) => {
          //       this.dbService.add('productRound', data).then(
          //         () => {},
          //         (error) => {
          //           console.log('Add product round error', error)
          //         },
          //       )
          //     })
          //   },
          //   (error) => {
          //     console.log(error)
          //   },
          // )
        }
      })
  }

  reloadProductRound() {
    try {
      return this.http
        .get(environment.restEndpointUrl + '/productRounds')
        .toPromise()
        .then((data: any) => {
          if (data.valid) {
            const productRoundsData = data.data.productRounds
            // this.dbService.clear('productRound').then(
            //   () => {
            //     _.each(productRoundsData, (data) => {
            //       if (data) {
            //         this.dbService.add('productRound', data)
            //       }
            //     })
            //   },
            //   (error) => {
            //     console.log(error)
            //   },
            // )
            return Promise.resolve(data)
          } else {
            return Promise.reject(new Error(data.reason))
          }
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    } catch (e) {}
  }
}
