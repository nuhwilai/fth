import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MainModule } from './main/main.module'
import { RegisterModule } from './register/register.module'
import { RequestQrCodeModule } from './request-qr-code/request-qr-code.module'
import { ShowQrCodeModule } from './show-qr-code/show-qr-code.module'
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MainModule,
    RegisterModule,
    RequestQrCodeModule,
    ShowQrCodeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
