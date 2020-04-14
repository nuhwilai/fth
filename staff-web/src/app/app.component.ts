import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import * as _ from 'lodash'
import { IndexDbService } from './indb/index-db.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'staff-web'
  loading = false
  user

  pathHideIcon = ['/home']
  currentPath = ''
  constructor(
    private _location: Location,
    private indexDbService: IndexDbService,
    private router: Router,
  ) {
    this.indexDbService.run()
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
