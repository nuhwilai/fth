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
  constructor(private indexDbService: IndexDbService) {
    this.indexDbService.run()
  }

  ngOnInit() {}
}
