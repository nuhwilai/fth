import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { LoginComponent } from './login/login.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NavBarComponent } from './nav-bar/nav-bar.component'
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
import { ToastModule } from 'primeng/toast'
import recieveTxn from './product-send/recieve-txn'
import { MessageService } from 'primeng/components/common/messageservice'

import { ProductRoundModule } from './product-round/product-round.module'
import productRoundIndbSchma from './main/product-round-indb-schma'
import { IncludeArrayPipe } from './include-array.pipe'
import { MainComponent } from './main/main.component'
import { AccordionModule } from 'primeng/accordion'
import { FieldsetModule } from 'primeng/fieldset'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import {
  AuthServiceConfig,
  GoogleLoginProvider,
  SocialLoginModule,
} from 'angularx-social-login'
import { AuthService } from './auth/auth.service'
import { NavBarModule } from './nav-bar/nav-bar.module'
import { AuthModule } from './auth/auth.module'
import { ReportModule } from './report/report.module'
import { ReceiveTxnModule } from './receive-txn/receive-txn.module'
import { DataIndexedDbService } from './indb/data-indexed-db.service'
import { SyncableDataService } from './indb/syncable-data.service'

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
    // NgxIndexedDBModule.forRoot(dbConfig),
    ToastModule,
    ProductRoundModule,
    AccordionModule,
    FieldsetModule,
    NavBarModule,
    ReportModule,
    ReceiveTxnModule,
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
    private syncableDataService: SyncableDataService
  ) {
    this.syncableDataService.init('fth-db', ['productRound', 'receiveTxn'])
    // this.dataIndexedDbService.useDb('fth-db', ['productRound', 'receiveTxn'])
  }
}
