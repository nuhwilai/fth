import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthLoginComponent } from './auth-login/auth-login.component'
import { SynceUpSurveyStatusComponent } from './synce-up-survey-status/synce-up-survey-status.component'
import { AuthService } from './auth.service'
import { IfAnyGrantedDirective } from './if-any-granted.directive'

@NgModule({
  declarations: [
    AuthLoginComponent,
    SynceUpSurveyStatusComponent,
    IfAnyGrantedDirective,
  ],
  imports: [CommonModule],
  exports: [
    AuthLoginComponent,
    SynceUpSurveyStatusComponent,
    IfAnyGrantedDirective,
  ],
})
export class AuthModule {
  constructor() {}
}
