import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ProductRoundReportComponent } from './product-round-report/product-round-report.component'
import { ReportRoutingModule } from './report-routing.module'
import { ReceiveTxnReportComponent } from './receive-txn-report/receive-txn-report.component'
import { UserReportComponent } from './user-report/user-report.component'
import { MultiSelectModule } from 'primeng/multiselect'

@NgModule({
  declarations: [
    ProductRoundReportComponent,
    ReceiveTxnReportComponent,
    UserReportComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    MultiSelectModule,
  ],
})
export class ReportModule {}
