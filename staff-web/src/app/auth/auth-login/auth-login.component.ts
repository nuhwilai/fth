import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AuthService as OAuthService,
  GoogleLoginProvider,
} from 'angularx-social-login'
import { AuthService } from '../auth.service'
@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
})
export class AuthLoginComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private oAuthService: OAuthService,
  ) {}
  authStateSub
  ngOnInit() {
    this.authStateSub = this.oAuthService.authState.subscribe((data) => {
      if (data) {
        this.authService.loginWithSocialUser(data)
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
    console.log('login success :')
  }

  onError(error: string) {
    console.log('error :', error)
  }
}
