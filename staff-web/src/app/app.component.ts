import { Component, OnInit } from '@angular/core'
import { BackgroundSyncService } from './indb/background-sync.service'
import { AuthService } from './auth/auth.service'
import { ReceiveTxnService } from './receive-txn/receive-txn.service'
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
  constructor(
    private backgroundSyncService: BackgroundSyncService,
    private authService: AuthService,
    private receiveTxnService: ReceiveTxnService,
  ) {}

  ngOnInit() {
    this.authService.finishLoading.subscribe(() => {
      this.loading = false
    })

    this.authService.authData$.subscribe((auth) => {
      if (auth.isAuthenticated) {
        this.backgroundSyncService.unregister()
        this.backgroundSyncService.run()
        this.receiveTxnService.updateStatusSync()
      }
    })
  }
}
