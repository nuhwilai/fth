import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductRoundCrudComponent } from './product-round-crud/product-round-crud.component'
import { AuthGuardService } from '../auth/auth-guard.service'
import { ProductRoundOfflineComponent } from './product-round-offline/product-round-offline.component'

const routes: Routes = [
  {
    path: 'product-round',
    component: ProductRoundCrudComponent,
    canActivate: [AuthGuardService],
    data: { ifAnyGranted: ['ADMIN'] },
  },
  {
    component: ProductRoundOfflineComponent,
    path: 'product-round-offline',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoundRoutingModule {}
