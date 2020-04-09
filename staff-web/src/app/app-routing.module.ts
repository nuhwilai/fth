import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MainComponent } from './main/main.component'
import { LoginComponent } from './login/login.component'
import { ProductSendComponent } from './product-send/product-send.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'product-send/:id', component: ProductSendComponent },
  {
    component: MainComponent,
    path: 'main',
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
