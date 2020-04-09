import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import {
  AuthServiceConfig,
  GoogleLoginProvider,
  SocialLoginModule,
} from 'angularx-social-login'
import { MainComponent } from './main/main.component'
import { LoginComponent } from './login/login.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NavBarComponent } from './nav-bar/nav-bar.component'
import googleOauth from 'src/environments/google-oauth'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './auth-interceptor'
import { ButtonModule } from 'primeng/button'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { RecieverInfoComponent } from './reciever-info/reciever-info.component'
import { ZXingScannerModule } from '@zxing/ngx-scanner'
import { CardModule } from 'primeng/card'
import { TableModule } from 'primeng/table'
import { DialogModule } from 'primeng/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ProductSendComponent } from './product-send/product-send.component'
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db'
import productRoundIndbSchma from './main/product-round-indb-schma'
import { IndexDbService } from './indb/index-db.service'
import { ToastModule } from 'primeng/toast'
import recieveTxn from './product-send/recieve-txn'
import { MessageService } from 'primeng/components/common/messageservice'

import { ProductRoundModule } from './product-round/product-round.module'
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(googleOauth.key),
  },
])

export function provideConfig() {
  return config
}

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [productRoundIndbSchma, recieveTxn],
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    NavBarComponent,
    RecieverInfoComponent,
    ProductSendComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    ProgressSpinnerModule,
    ZXingScannerModule,
    CardModule,
    TableModule,
    DialogModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ToastModule,
    ProductRoundModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private indexDbService: IndexDbService) {}
}
