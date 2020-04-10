import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService as OAuthService } from 'angularx-social-login'
import { AuthService } from './auth.service'
import { Location } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'staff-web'
  loading = true
  user
  constructor(private authService: AuthService, private _location: Location) {
    this.authService.settingsLoaded.subscribe(() => {
      this.loading = false
    })
  }

  backClicked($event) {
    this._location.back()
  }
}
