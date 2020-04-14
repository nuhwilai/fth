import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {
  AuthService as OAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login'
import { AuthService } from '../auth/auth.service'
import { MessageService } from 'primeng/api'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  signinForm: FormGroup
  user: SocialUser
  loggedIn: boolean
  authStateSub: any
  unsubscribe$ = new Subject()
  isAuthenticated: boolean

  backToRoute: string
  constructor(
    private router: Router,
    private oAuthService: OAuthService,
    private authService: AuthService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
    this.route.queryParams.subscribe(params => this.backToRoute = params['backTo'])
    this.authService.authData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((authData) => {
        // this.isAuthenticated = authData.isAuthenticated
        if (authData.isAuthenticated && this.backToRoute) {
          this.router.navigateByUrl(this.backToRoute)
        }
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

  ngOnDestroy() {
    this.authStateSub.unsubscribe()
  }

  onSuccess = () => {
    this.messageService.add({
      severity: 'success',
      summary: 'ลงชื่อเข้าใช้งาน',
      detail: `ลงชื่อเข้าใช้งานเรียบร้อย`,
    })
    this.oAuthService.signOut(true)
  }

  onError = (error: string) => {
    console.log('error :', error)
    this.messageService.add({
      severity: 'error',
      detail: `เข้าสู้ระบบไม่สำเร็จ ${error || 'ไม่ทราบสาเหตุ'}`,
    })
  }
}
