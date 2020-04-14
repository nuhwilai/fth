import { Component, OnInit } from '@angular/core'

import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { IndexDbService, ITxnSubject } from 'src/app/indb/index-db.service'
import { AuthService } from '../auth.service'
@Component({
  selector: 'app-synce-up-survey-status',
  templateUrl: './synce-up-survey-status.component.html',
  styleUrls: ['./synce-up-survey-status.component.css'],
})
export class SynceUpSurveyStatusComponent implements OnInit {
  public unsubscribe$ = new Subject()
  status
  serveyLocalCount = 0
  isAuth // TODO check auth
  constructor(
    private localDbService: IndexDbService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.authData$.subscribe((authData) => {
      if (authData) {
        this.isAuth = authData.isAuthenticated
      }
    })
    this.localDbService
      .getSyncUpTxn$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((surveySubjectResult: ITxnSubject) => {
        console.log('surveySubjectResult :', surveySubjectResult)
        this.status = surveySubjectResult.status
        this.serveyLocalCount = surveySubjectResult.txnCount
      })
  }
}
