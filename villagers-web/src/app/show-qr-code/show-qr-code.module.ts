import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ShowQrCodeRoutingModule } from './show-qr-code-routing.module'
import { ShowQrCodeComponent } from './show-qr-code.component'
@NgModule({
  declarations: [ShowQrCodeComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ShowQrCodeRoutingModule,
  ],
})
export class ShowQrCodeModule {}
