import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductRoundCrudComponent } from './product-round-crud/product-round-crud.component'

const routes: Routes = [
  { path: 'productRound', component: ProductRoundCrudComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoundRoutingModule {}
