import { Injectable } from '@angular/core'
import { BehaviorSubject, interval, ReplaySubject } from 'rxjs'
import { SocialUser } from 'angularx-social-login'
import { debounce } from 'rxjs/operators'
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authData = { isLogin: false, authToken: null }
  authData$: BehaviorSubject<any>
  public settingsLoaded: ReplaySubject<any> = new ReplaySubject()
  constructor( private router: Router) {
    this.authData$ = new BehaviorSubject({ isLogin: false })
    // this.registerOAuth();
    this.settingsLoaded.next(true)
  }

  // registerOAuth() {
  //   this.oAuthService.authState
  //     .pipe(debounce(() => interval(1000)))
  //     .subscribe((socialUser) => {
  //       if (socialUser) {
  //         this.setUser(socialUser)
  //         this.router.navigateByUrl('/')
  //       } else {
  //         this.router.navigateByUrl('/login')
  //       }
  //       this.settingsLoaded.next(true)
  //     })
  // }

  loginWithGoogle(socialUser: SocialUser) {}

  setUser(socialUser: SocialUser) {
    const authData = {
      isLogin: true,
      authToken: socialUser.authToken,
      email: socialUser.email,
      photo: socialUser.photoUrl,
    }
    this.authData = authData
    this.authData$.next(authData)
  }

  logout() {
    this.authData = {
      isLogin: false,
      authToken: null,
    }
  }
}
