import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ProductRoundService } from '../product-round.service'
import { MessageService } from 'primeng/components/common/messageservice'
import * as _ from 'lodash'

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
  
  productRoundInint
  max = 15
  constructor(
    private productRoundService: ProductRoundService,
    private messaageService: MessageService,
  ) {}

  ngOnInit() {
    this.productRoundForm = new FormGroup({
      _id: new FormControl(null),
      productName: new FormControl(null, [Validators.required]),
      roundDateTime: new FormControl(null, [Validators.required]),
    })

    this.initProductRounds()
  }

  refreshData() {
    this.loading = true
    this.productRoundService.listProductRoundOffline({}).then((res: any) => {
      this.productRoundList = this.prepareProductRounds(res)
      this.totalRecords = this.productRoundList.length
      this.loading = false
    })
  }

  syncDownProductRound() {
    this.loading = true
    this.productRoundService
      .syncDownProductRound()
      .then((result: any) => {
        if (result && result.valid) {
          this.productRoundList = this.prepareProductRounds(
            result.data.productRounds,
          )
          this.totalRecords = this.productRoundList.length
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

  initProductRounds() {
    this.productRoundService
      .listProductRounds({})
      .subscribe((res: IResponseSuccess) => {
        if (res.valid) {
          this.productRoundInint = this.prepareProductRounds(
            res.data.productRounds,
          )
          this.totalRecords = this.productRoundInint.length
          this.productRoundList = _.slice(this.productRoundInint, 0, this.max)
        }
        this.loading = false
      })
  }

  private loadProductRounds(offset: number, max: number) {
    this.loading = true
    this.productRoundList = _.slice(
      this.productRoundInint,
      offset,
      max + offset,
    )
    this.loading = false
  }

  loadProductRoundsLazy($event: any) {
    this.loadProductRounds($event.first, $event.rows)
  }

  get f() {
    return this.productRoundForm.controls
  }
  prepareProductRounds = (rounds: IProductRound[]) => {
    return rounds.map((it) => this.parseRoundDateTime(it))
  }

  parseRoundDateTime = (productRound: IProductRound) => {
    return {
      ...productRound,
      roundDateTime: new Date(productRound.roundDateTime),
    }
  }
}
