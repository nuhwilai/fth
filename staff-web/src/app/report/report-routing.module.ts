import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductRoundReportComponent } from './product-round-report/product-round-report.component'
import { ReceiveTxnReportComponent } from './receive-txn-report/receive-txn-report.component'

const routes: Routes = [
  {
    path: 'product-round-report',
    component: ProductRoundReportComponent,
  },
  {
    path: 'receive-txn-report',
    component: ReceiveTxnReportComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
