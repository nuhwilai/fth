import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { AuthService as OAuthService } from 'angularx-social-login'
import { AuthService } from './auth.service'
import { Location } from '@angular/common'
import { IndexDbService } from './indb/index-db.service'
import * as _ from 'lodash'
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
  currentPath
  constructor(
    private authService: AuthService,
    private _location: Location,
    private indexDbService: IndexDbService,
    private router: Router,
  ) {
    this.authService.settingsLoaded.subscribe(() => {
      this.loading = false
    })
    console.log(this.router)
    this.currentPath = '/home'
  }

  backClicked($event) {
    this._location.back()
  }

  ngOnInit() {
    this.subscribeCurrentPath()
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
}
