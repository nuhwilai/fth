import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service'
import { LoginComponent } from './login/login.component'
import { MainComponent } from './main/main.component'
import { ProductSendComponent } from './product-send/product-send.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'product-send/:id',
    component: ProductSendComponent,
    canActivate: [AuthGuard],
    data: { ifAnyGranted: ['ADMIN', 'STAFF'] },
  },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [AuthGuard],
    data: { ifAnyGranted: ['ADMIN', 'STAFF'] },
  },
  {
    component: LoginComponent,
    path: 'login',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
