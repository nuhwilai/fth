import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { ProductSendComponent } from './product-send/product-send.component'
import { ProductRoundCrudComponent } from './product-round/product-round-crud/product-round-crud.component'
import { MainComponent } from './main/main.component'
import { ProductRoundOfflineComponent } from './product-round/product-round-offline/product-round-offline.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'product-send/:id', component: ProductSendComponent },
  { path: 'home', component: MainComponent },
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
