import { Component, OnInit, ElementRef } from '@angular/core'
import { IndexDbService } from '../indb/index-db.service'
import { Router, NavigationEnd } from '@angular/router'
import * as _ from 'lodash'
import { Location } from '@angular/common'
import { AuthService } from '../auth/auth.service'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { MessageService } from 'primeng/components/common/messageservice'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class NavBarComponent implements OnInit {
  public unsubscribe$ = new Subject()
  title = 'staff-web'
  loading = true
  user

  pathHideIcon = ['/home', '/login']
  currentPath = ''
  showPanelMobile: boolean = false
  isAuth = true
  authData = ''

  isShowPanel = false
  constructor(
    private _location: Location,
    private router: Router,
    private _eref: ElementRef,
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.subscribeCurrentPath()
    this.authService.authData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((authData) => {
        if (authData) {
          this.isAuth = authData.isAuthenticated
          this.authData = authData.email
        }
      })
  }
  goToMainMenu() {
    return this.router.navigate(['/home'])
  }
  showPanel() {
    this.isShowPanel = !this.isShowPanel
  }
  hideAll(): void {
    this.isShowPanel = false
  }

  private subscribeCurrentPath() {
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        this.currentPath = value.urlAfterRedirects
      }
    })
  }
  get isHideBackButton(): boolean {
    return _.chain(this.pathHideIcon)
      .map((it) => {
        return this.currentPath.search(it) >= 0
      })
      .reduce((bool = false, it) => {
        return bool || it
      })
      .value()
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.isShowPanel = false
      this.showPanelMobile = false
    }
  }

  logout() {
    this.authService.logout()
    this.messageService.add({
      severity: 'success',
      detail: 'ออกจากระบบสำเร็จ',
    })
  }

  backClicked($event) {
    this._location.back()
  }

  functionShowPanelMobile() {
    this.showPanelMobile = !this.showPanelMobile
  }
}
