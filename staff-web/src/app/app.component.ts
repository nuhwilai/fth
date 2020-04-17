import { Component, OnInit } from '@angular/core'
import { BackgroundSyncService } from './indb/background-sync.service'
import { AuthService } from './auth/auth.service'
import { ReceiveTxnService } from './receive-txn/receive-txn.service'
import { SyncableDataService } from './indb/syncable-data.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'staff-web'
  loading = true
  user

  pathHideIcon = ['/home']
  currentPath = ''
  isReady = true
  constructor(
    private backgroundSyncService: BackgroundSyncService,
    private authService: AuthService,
    private receiveTxnService: ReceiveTxnService,
    private syncableDataService: SyncableDataService,
  ) {
    this.syncableDataService.init('fth-db', ['productRound', 'receiveTxn'])
    this.syncableDataService.settingLoaded.subscribe(() => {
      this.backgroundSyncService.subscribeAuthChange()
    })
  }

  ngOnInit() {
    this.authService.finishLoading.subscribe(() => {
      this.loading = false
    })
  }
}
