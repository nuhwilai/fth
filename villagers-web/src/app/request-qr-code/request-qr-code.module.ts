import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RequestQrCodeRoutingModule } from './request-qr-code-routing.module'
import { RequestQrCodeComponent } from './request-qr-code.component'
@NgModule({
  declarations: [RequestQrCodeComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RequestQrCodeRoutingModule,
  ],
})
export class RequestQrCodeModule {}
