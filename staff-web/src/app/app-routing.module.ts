import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { ProductSendComponent } from './product-send/product-send.component'
import { ProductRoundCrudComponent } from './product-round/product-round-crud/product-round-crud.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'product-round' },
  { path: 'product-send/:id', component: ProductSendComponent },
  {
    component: ProductRoundCrudComponent,
    path: 'product-round',
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
