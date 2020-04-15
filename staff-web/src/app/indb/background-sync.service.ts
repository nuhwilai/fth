import { Injectable, OnDestroy } from '@angular/core'
import { Subject, BehaviorSubject } from 'rxjs'
import { ITxnSubject } from './index-db.service'
import { HttpClient } from '@angular/common/http'
import { takeUntil } from 'rxjs/operators'
import { AuthService, AuthData } from '../auth/auth.service'
import { SyncableDataService } from './syncable-data.service'
import { ReceiveTxnService } from '../receive-txn/receive-txn.service'
import { ProductRoundService } from '../product-round/product-round.service'
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root',
})
export class BackgroundSyncService implements OnDestroy {
  unsubscribe$ = new Subject()
  private intervalInstance = null
  private intervalTime = 20000
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
    private syncableDataService: SyncableDataService,
    private receiveTxnService: ReceiveTxnService,
    private productRoundService: ProductRoundService,
  ) {
    this.authService.authData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((auth: AuthData) => {
        this.isAuth = auth.isAuthenticated
        this.authData = auth
      })
  }

  run() {
    this.syncDownProductRound()
    this.syncUpReceiveTxn()

    this.intervalInstance = setTimeout(() => {
      this.syncDownProductRound()
      this.syncUpReceiveTxn()
    }, this.intervalTime)
  }

  ngOnDestroy() {
    this.unregister()
  }

  unregister() {
    clearInterval(this.intervalInstance)
  }

  syncUpReceiveTxn = async () => {
    if (!this.authService.isGranted(['ADMIN', 'STAFF'])) {
      return
    }
    try {
      await this.syncableDataService.upload(
        'receiveTxn',
        1,
        this.receiveTxnService.saveAsPromise,
      )
      this.receiveTxnService.updateStatusSync()
    } catch (e) {
      console.log('e :', e)
    }
  }

  syncDownProductRound = async () => {
    if (!this.authService.isGranted(['ADMIN', 'STAFF'])) {
      return
    }
    try {
      const result: any = await this.productRoundService
        .listProductRounds({})
        .toPromise()
      const newResult = _.map(result.data.productRounds, (productRound) => {
        return { data: productRound }
      })
      await this.syncableDataService.download('productRound', newResult)
    } catch (e) {}
  }
}
