import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthLoginComponent } from './auth-login/auth-login.component'
import { SynceUpSurveyStatusComponent } from './synce-up-survey-status/synce-up-survey-status.component'
import { AuthService } from './auth.service'

@NgModule({
  declarations: [AuthLoginComponent, SynceUpSurveyStatusComponent],
  imports: [CommonModule],
  exports: [AuthLoginComponent, SynceUpSurveyStatusComponent],
})
export class AuthModule {
  constructor() {}
}
