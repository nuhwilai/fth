import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import decode from 'jwt-decode'
import { BehaviorSubject } from 'rxjs'
import { SocialUser } from 'angularx-social-login'
import { environment } from 'src/environments/environment'
import { LocalStorage } from '@ngx-pwa/local-storage'
import { intersection } from 'lodash'

export type AuthData = {
  isAuthenticated: boolean
  email?: string
  role?: string
  token?: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authData: AuthData = { isAuthenticated: false }
  authDataSubject: BehaviorSubject<AuthData>

  loginSub
  constructor(
    private router: Router,
    private http: HttpClient,
    private asyncLocalStorage: LocalStorage,
  ) {
    this.asyncLocalStorage.getItem('access_token').subscribe((token) => {
      this.assignAuthDataIfApplicable(token)
    })
    this.authDataSubject = new BehaviorSubject(this.authData)
  }

  get authData$() {
    return this.authDataSubject.asObservable()
  }

  private assignAuthDataIfApplicable(token) {
    if (token) {
      this.assignAuthDataWithToken(token)
      if (this.authData.isAuthenticated) {
        this.handleAuthChanged()
      }
    }
  }

  private assignAuthDataWithToken(token) {
    try {
      const decoded = decode(token)
      this.authData = {
        isAuthenticated: true,
        email: decoded.email,
        role: decoded.role,
        token,
      }
    } catch (e) {
      this.authData = { isAuthenticated: false }
    }
  }

  private handleAuthChanged() {
    if (this.authDataSubject) {
      this.authDataSubject.next(this.authData)
    }
  }

  isGranted(ifAnyGranted: any): boolean {
    if (!this.authData.isAuthenticated) return false
    if (!ifAnyGranted) {
      return true
    }
    return intersection([this.authData.role], ifAnyGranted).length > 0
  }

  loginWithSocialUser(socialUser: SocialUser, onSucces?: any, onError?: any) {
    this.loginSub = this.http
      .post(environment.loginEndpointUrl, { oauthToken: socialUser.authToken })
      .subscribe(
        (result: any) => {
          if (result.valid) {
            this.handleLoginResult(result.data)
            if (onSucces) {
              onSucces()
            }
          } else {
            if (onError) {
              onError(result.reason)
            }
          }
        },
        (error: any) => {
          console.error('error: ', error.message)
          if (onError) {
            onError(error.message)
          }
        },
      )
  }

  private handleLoginResult(result) {
    this.asyncLocalStorage
      .setItem('access_token', result.token)
      .subscribe(() => {
        this.router.navigate(['/home'])
        this.assignAuthDataIfApplicable(result.token)
      })
    // localStorage.setItem('access_token', result.token)
  }

  logout() {
    this.authData = { isAuthenticated: false }
    this.handleAuthChanged()
    this.asyncLocalStorage.removeItem('access_token').subscribe(() => {
      if (this.loginSub) {
        this.loginSub.unsubscribe()
      }
      this.router.navigate(['/login'])
    })
  }
}
