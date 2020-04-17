import { Injectable, OnDestroy } from '@angular/core'
import { Subject, BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { takeUntil } from 'rxjs/operators'
import { AuthService, AuthData } from '../auth/auth.service'
import { SyncableDataService } from './syncable-data.service'
import {
  ReceiveTxnService,
  ITxnSubject,
} from '../receive-txn/receive-txn.service'
import { ProductRoundService } from '../product-round/product-round.service'
import * as _ from 'lodash'
@Injectable({
  providedIn: 'root',
})
export class BackgroundSyncService implements OnDestroy {
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
    private syncableDataService: SyncableDataService,
    private receiveTxnService: ReceiveTxnService,
    private productRoundService: ProductRoundService,
  ) {}

  subscribeAuthChange() {
    this.authService.authData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((auth: AuthData) => {
        this.isAuth = auth.isAuthenticated
        this.authData = auth
        this.unregister()
        if (auth.isAuthenticated) {
          this.run()
        } else {
          this.receiveTxnService.updateStatusSync(true)
        }
      })
  }

  run() {
    console.log('run background service')
    this.syncDownProductRound()
    this.syncUpReceiveTxn()

    this.intervalInstance = setInterval(() => {
      this.syncDownProductRound()
      this.syncUpReceiveTxn()
    }, this.intervalTime)
  }

  ngOnDestroy() {
    this.unregister()
  }

  unregister() {
    console.log('clear background service')
    clearInterval(this.intervalInstance)
  }

  syncUpReceiveTxn = async (isFirst = true) => {
    if (!this.authService.isGranted(['ADMIN', 'STAFF'])) {
      return isFirst ? this.receiveTxnService.updateStatusSync(true) : null
    }
    try {
      await this.syncableDataService.upload(
        'receiveTxn',
        100,
        this.receiveTxnService.saveAsPromise,
      )
      this.receiveTxnService.updateStatusSync()
    } catch (e) {
      console.log('e :', e)
      this.receiveTxnService.updateStatusSync()
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
