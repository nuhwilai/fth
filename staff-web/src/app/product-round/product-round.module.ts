import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ProductRoundCrudComponent } from './product-round-crud/product-round-crud.component'
import { ProductRoundOfflineComponent } from './product-round-offline/product-round-offline.component'
import { ProductRoundRoutingModule } from './product-round-routing.module'

@NgModule({
  declarations: [ProductRoundCrudComponent, ProductRoundOfflineComponent],
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
