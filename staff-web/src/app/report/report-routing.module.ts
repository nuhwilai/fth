import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductRoundReportComponent } from './product-round-report/product-round-report.component'
import { AuthGuardService } from '../auth/auth-guard.service'

const routes: Routes = [
  {
    path: 'product-round-report',
    component: ProductRoundReportComponent,
    canActivate: [AuthGuardService],
    data: { ifAnyGranted: ['ADMIN', 'STAFF'] },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
