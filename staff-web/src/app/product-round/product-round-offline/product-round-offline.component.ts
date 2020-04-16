import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ProductRoundService } from '../product-round.service'
import { MessageService } from 'primeng/components/common/messageservice'
import * as _ from 'lodash'
import * as moment from 'moment'

@Component({
  selector: 'app-product-round-offline',
  templateUrl: './product-round-offline.component.html',
  styleUrls: ['./product-round-offline.component.scss'],
})
export class ProductRoundOfflineComponent implements OnInit {
  displayDialog: boolean

  productRound: IProductRound
  newProductRound: boolean
  productRoundList: any[] = []
  productRoundListOrigin: any[] = []
  productRoundForm: FormGroup
  submitted: boolean = false

  loading: boolean = true
  totalRecords: number
  currentOption: any = {}

  formInitialValue: IProductRound = {
    _id: null,
    productName: null,
    roundDate: null,
    roundDateTime: null,
  }

  max = 15
  constructor(
    private productRoundService: ProductRoundService,
    private messaageService: MessageService,
  ) {}

  ngOnInit() {
    this.initProductRound()
    this.productRoundForm = new FormGroup({
      _id: new FormControl(null),
      productName: new FormControl(null, [Validators.required]),
      roundDateTime: new FormControl(null, [Validators.required]),
    })
  }

  initProductRound() {
    this.loading = true
    this.productRoundService.listProductRoundOffline({}).then((res: any) => {
      const newData = _.map(res, (data) => data.data)
      this.productRoundListOrigin = newData
      this.productRoundList = _.slice(this.productRoundListOrigin, 0, this.max)
      this.totalRecords = this.productRoundListOrigin.length
      this.loading = false
    })
  }

  syncDownProductRound() {
    this.loading = true
    this.productRoundService
      .syncDownProductRound()
      .then((result: any) => {
        if (result && result.valid) {
          const newData = _.map(result.data, (data) => data.data)
          this.productRoundListOrigin = newData
          this.productRoundList = _.slice(
            this.productRoundListOrigin,
            0,
            this.max,
          )
          this.totalRecords = this.productRoundListOrigin.length
          this.messaageService.add({
            severity: 'success',
            detail: `สามารถโหลดข้อมูลสำเร็จ`,
          })
        } else {
          this.messaageService.add({
            severity: 'error',
            detail: `ไม่สามารถโหลดข้อมูลได้ ${result.reason || 'ไม่พบสาเหตุ'}`,
          })
        }
      })
      .catch((error) => {
        this.messaageService.add({
          severity: 'error',
          detail: `ไม่สามารถโหลดข้อมูลได้ ${error.message || error}`,
        })
      })
      .finally(() => {
        this.loading = false
      })
  }

  private loadProductRounds(
    offset: number,
    max: number,
    filter?: any,
    sort?: string,
    order?: number,
  ) {
    this.loading = true
    setTimeout(() => {
      this.productRoundList = _.slice(
        this.productRoundListOrigin,
        offset,
        offset + this.max,
      )
      this.loading = false
    }, 0)
  }

  loadProductRoundsLazy($event: any) {
    // loadRefPersonsLazy($event: LazyLoadEvent) {
    this.loadProductRounds(
      $event.first,
      $event.rows,
      $event.filters,
      $event.sortField,
      $event.sortOrder,
    )
  }

}
