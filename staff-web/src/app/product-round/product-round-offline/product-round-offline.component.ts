import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ProductRoundService } from '../product-round.service'
import { MessageService } from 'primeng/components/common/messageservice'

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
    roundDateTime: new Date(),
  }
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

    this.initFilters()
  }

  refreshData() {
    this.loading = true
    this.productRoundService.listProductRoundOffline({}).then((res: any) => {
      // if (res.valid) {
      this.productRoundList = this.prepareProductRounds(res)
      this.totalRecords = this.productRoundList.length
      // }
      this.loading = false
    })
  }

  syncDownProductRound() {
    this.loading = true
    this.productRoundService
      .syncDownProductRound()
      .then((result: any) => {
        if (result && result.valid) {
          this.productRoundList = this.prepareProductRounds(result.data.productRounds)
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

  private loadProductRounds(
    offset: number,
    max: number,
    filter?: any,
    sort?: string,
    order?: number,
  ) {
    this.loading = true
    console.log('load product round')
    setTimeout(() => {
      this.productRoundService.listProductRoundOffline({}).then((res: any) => {
        // if (res.valid) {
        this.productRoundList = this.prepareProductRounds(res)
        this.totalRecords = this.productRoundList.length
        console.log('this.productRoundList', this.productRoundList)
        // }
        this.loading = false
      })
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

  get f() {
    return this.productRoundForm.controls
  }

  private initFilters() {}

  onResetFilter(dt) {
    this.initFilters()
  }

  showDialogToAdd() {
    this.newProductRound = true
    this.productRound = this.formInitialValue
    this.productRoundForm.patchValue(this.productRound)
    this.displayDialog = true
  }

  onDialogHide(event: any) {
    this.submitted = false
    this.productRoundForm.reset(this.formInitialValue)
  }

  onRowSelect(event: any) {
    this.newProductRound = false
    this.productRound = event.data
    // this.productRound = _.clone(event.data)
    this.productRoundForm.patchValue(this.productRound)
    this.displayDialog = true
    this.submitted = true
  }

  save() {
    this.submitted = true
    if (this.productRoundForm.invalid) return
    if (this.newProductRound) {
      this.productRoundService
        .createProductRound(this.productRoundForm.value)
        .subscribe((res: IResponseSuccess) => {
          if (res.valid) {
            console.log(`product round ${res.data._id} has been created`)
          } else {
          }
          this.refreshData()
        })
    } else {
      let _value = this.productRoundForm.value
      let _id = _value._id
      delete _value._id
      this.productRoundService
        .updateProductRound(_id, _value)
        .subscribe((res: IResponseSuccess) => {
          if (res.valid) {
            console.log(`product round ${res.data._id} has been updated.`)
          }
          this.refreshData()
        })
    }
    this.productRound = this.formInitialValue
    this.displayDialog = false
    this.submitted = false
  }

  delete(id: string) {
    this.productRoundService
      .deleteProductRound(id)
      .subscribe((res: IResponseSuccess) => {
        if (res.valid) {
          console.log(`product round id ${res.data._id} has been deleted.`)
        } else {
        }
        this.refreshData()
        delete this.productRound
      })
    this.displayDialog = false
    this.submitted = false
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
