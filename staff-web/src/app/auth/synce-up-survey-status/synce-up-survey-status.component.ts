import { Component, OnInit } from '@angular/core'

import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { AuthService } from '../auth.service'
import { ReceiveTxnService, ITxnSubject } from 'src/app/receive-txn/receive-txn.service'
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
    private authService: AuthService,
    private receiveTxnService: ReceiveTxnService,
  ) {}

  ngOnInit(): void {
    this.authService.authData$.subscribe((authData) => {
      if (authData) {
        this.isAuth = authData.isAuthenticated
      }
    })
    this.receiveTxnService
      .getSyncUpTxn$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((surveySubjectResult: ITxnSubject) => {
        this.status = surveySubjectResult.status
        this.serveyLocalCount = surveySubjectResult.txnCount
      })
  }
}
