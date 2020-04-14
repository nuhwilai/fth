import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AuthService as OAuthService,
  GoogleLoginProvider,
} from 'angularx-social-login'
import { AuthService } from '../auth.service'
import { MessageService } from 'primeng/components/common/messageservice'
@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
})
export class AuthLoginComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private oAuthService: OAuthService,
    private messageService: MessageService,
  ) {}
  authStateSub
  ngOnInit() {
    this.authStateSub = this.oAuthService.authState.subscribe((data) => {
      if (data) {
        this.authService.loginWithSocialUser(data, this.onSuccess, this.onError)
        this.oAuthService.signOut(true)
      }
    })
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe()
  }

  signInWithGoogle(): void {
    this.oAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  onSuccess = () => {
    this.messageService.add({
      severity: 'success',
      detail: 'เข้าสู้ระบบสำเร็จ',
    })
  }

  onError = (error: string) => {
    console.log('error :', error)
    this.messageService.add({
      severity: 'error',
      detail: `เข้าสู้ระบบไม่สำเร็จ ${error || 'ไม่ทราบสาเหตุ'}`,
    })
  }
}
