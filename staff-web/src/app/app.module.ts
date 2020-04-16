import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { ZXingScannerModule } from '@zxing/ngx-scanner'
import {
  AuthServiceConfig,
  GoogleLoginProvider,
  SocialLoginModule,
} from 'angularx-social-login'
import { AccordionModule } from 'primeng/accordion'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { MessageService } from 'primeng/components/common/messageservice'
import { DialogModule } from 'primeng/dialog'
import { FieldsetModule } from 'primeng/fieldset'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { IncludeArrayPipe } from './include-array.pipe'
import { DataIndexedDbService } from './indb/data-indexed-db.service'
import { SyncableDataService } from './indb/syncable-data.service'
import { LoginComponent } from './login/login.component'
import { MainComponent } from './main/main.component'
import { NavBarModule } from './nav-bar/nav-bar.module'
import { ProductRoundModule } from './product-round/product-round.module'
import { ProductSendComponent } from './product-send/product-send.component'
import { ReceiveTxnModule } from './receive-txn/receive-txn.module'
import { RecieverInfoComponent } from './reciever-info/reciever-info.component'
import { ReportModule } from './report/report.module'
import { UserModule } from './user/user.module'
import { RequestQrCodeModule } from './request-qr-code/request-qr-code.module'
import { ShowQrCodeModule } from './show-qr-code/show-qr-code.module'
import { AuthInterceptor } from './auth/auth-interceptor'

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleApi.key),
  },
])

export function provideConfig() {
  return config
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecieverInfoComponent,
    ProductSendComponent,
    IncludeArrayPipe,
    MainComponent,
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
    ToastModule,
    ProductRoundModule,
    AccordionModule,
    FieldsetModule,
    NavBarModule,
    ReportModule,
    ReceiveTxnModule,
    UserModule,
    RequestQrCodeModule,
    ShowQrCodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AuthModule,
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
  constructor(
    private authService: AuthService,
    private dataIndexedDbService: DataIndexedDbService,
    private syncableDataService: SyncableDataService,
  ) {
    this.syncableDataService.init('fth-db', ['productRound', 'receiveTxn'])
  }
}
