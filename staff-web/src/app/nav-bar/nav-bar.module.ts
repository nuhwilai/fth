import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavBarComponent } from './nav-bar.component'
import { AuthModule } from '../auth/auth.module'

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, AuthModule],
  exports: [NavBarComponent],
})
export class NavBarModule {}
