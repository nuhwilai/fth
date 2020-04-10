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
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db'
import { IndexDbService } from './indb/index-db.service'
import { ToastModule } from 'primeng/toast'
import recieveTxn from './product-send/recieve-txn'
import { MessageService } from 'primeng/components/common/messageservice'

import { ProductRoundModule } from './product-round/product-round.module'
import productRoundIndbSchma from './main/product-round-indb-schma'
import { IncludeArrayPipe } from './include-array.pipe'
import { MainComponent } from './main/main.component'
import { AccordionModule } from 'primeng/accordion'
import { FieldsetModule } from 'primeng/fieldset'
// const config = new AuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider(googleOauth.key),
//   },
// ])

// export function provideConfig() {
//   return config
// }

export function migrationFactory() {
  // The animal table was added with version 2 but none of the existing tables or data needed
  // to be modified so a migrator for that version is not included.
  return {
    1: (db, transaction) => {
      const store1 = transaction.objectStore('productRound')
      const store2 = transaction.objectStore('recieveTxn')
    },
  }
}

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 2,
  objectStoresMeta: [
    {
      store: 'productRound',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: '_id', keypath: '_id', options: { unique: true } },
        {
          name: 'productName',
          keypath: 'productName',
          options: { unique: true },
        },
        {
          name: 'roundDateTime',
          keypath: 'roundDateTime',
          options: { unique: false },
        },
      ],
    },
    {
      store: 'recieveTxn',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        {
          name: 'nationalId',
          keypath: 'nationalId',
          options: { unique: false },
        },
        {
          name: 'receivedDateTime',
          keypath: 'receivedDateTime',
          options: { unique: false },
        },
        {
          name: 'amount',
          keypath: 'amount',
          options: { unique: false },
        },
        {
          name: 'staffId',
          keypath: 'staffId',
          options: { unique: false },
        },
        {
          name: 'productId',
          keypath: 'productId',
          options: { unique: false },
        },
      ],
    },
  ],
  migrationFactory,
}
// const dbConfig: DBConfig = {
//   name: 'MyDb',
//   version: 1,
//   objectStoresMeta: [productRoundIndbSchma, recieveTxn],
// }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
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
    // SocialLoginModule,
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
    AccordionModule,
    FieldsetModule,
  ],
  providers: [
    // {
    //   provide: AuthServiceConfig,
    //   useFactory: provideConfig,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
