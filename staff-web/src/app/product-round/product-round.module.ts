import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductRoundCrudComponent } from './product-round-crud/product-round-crud.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { ProductRoundRoutingModule } from './product-round-routing.module'
import { DialogModule } from 'primeng/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { InputTextModule } from 'primeng/inputtext'
import { CalendarModule } from 'primeng/calendar'
@NgModule({
  declarations: [ProductRoundCrudComponent],
  exports: [ProductRoundCrudComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ProductRoundRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
  ],
})
export class ProductRoundModule {}
