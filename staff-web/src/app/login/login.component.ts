import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService as OAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login'
import { AuthService } from '../auth/auth.service'
import { MessageService } from 'primeng/api'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup
  user: SocialUser
  loggedIn: boolean
  authStateSub: any
  constructor(
    private oAuthService: OAuthService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
    this.authStateSub = this.oAuthService.authState.subscribe((user) => {
      if (user) {
        this.authService.loginWithSocialUser(user, this.onSuccess, this.onError)
      }
    })
  }

  signInWithGoogle(): void {
    this.oAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  signOut(): void {
    this.oAuthService.signOut()
  }

  onSuccess = () => {
    this.messageService.add({
      severity: 'success',
      summary: 'ลงชื่อเข้าใช้งาน',
      detail: `ลงชื่อเข้าใช้งานเรียบร้อย`,
    })
    this.oAuthService.signOut(true)
  }

  onError(error) {
    this.messageService.add({
      severity: 'error',
      summary: 'ลงชื่อเข้าใช้งาน',
      detail: `มีข้อผิดพลาดในการลงชื่อเข้าใช้ ${error}`,
    })
    console.log('error :', error)
  }
}
