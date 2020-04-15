import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ProductRoundService } from '../product-round.service'
import * as _ from 'lodash'
import * as moment from 'moment'
import { LazyLoadEvent } from 'primeng/api'
@Component({
  selector: 'app-product-round-crud',
  templateUrl: './product-round-crud.component.html',
  styleUrls: ['./product-round-crud.component.scss'],
})
export class ProductRoundCrudComponent implements OnInit {
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
  currentLazyLoadEvent: LazyLoadEvent
  constructor(private productRoundService: ProductRoundService) {}

  ngOnInit() {
    this.productRoundForm = new FormGroup({
      _id: new FormControl(null),
      productName: new FormControl(null, [Validators.required]),
      roundDate: new FormControl(null, [Validators.required]),
      roundDateTime: new FormControl(null, [Validators.required]),
    })

    this.productRoundForm.get('roundDateTime').valueChanges.subscribe((val) => {
      if (val) {
        this.productRoundForm.patchValue(
          {
            roundDate: moment(val).format('YYYY-MM-DD'),
          },
          { onlySelf: true, emitEvent: false },
        )
      }
    })

    this.initFilters()
  }

  private refreshData() {
    this.loading = true
    this.productRoundService
      .listProductRounds({})
      .subscribe((res: IResponseSuccess) => {
        if (res.valid) {
          this.productRoundList = this.prepareProductRounds(
            res.data.productRounds,
          )
          this.totalRecords = this.productRoundList.length
          console.log('this.productRoundList', this.productRoundList)
        }
        this.loading = false
      })
  }

  private loadProductRounds(
    offset: number,
    max: number,
    filters?: any,
    sort?: string,
    order?: number,
  ) {
    this.loading = true
    let _filters = this.prepareFilters(filters)
    console.log('load product rounds with filters', _filters)
    setTimeout(() => {
      this.productRoundService
        .listProductRounds(_filters)
        .subscribe((res: IResponseSuccess) => {
          if (res.valid) {
            this.productRoundList = this.prepareProductRounds(
              res.data.productRounds,
            )
            this.totalRecords = this.productRoundList.length
            console.log('this.productRoundList', this.productRoundList)
          }
          this.loading = false
        })
    }, 0)
  }

  loadProductRoundsLazy($event: LazyLoadEvent) {
    this.currentLazyLoadEvent = $event
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

  private initFilters() {
    this.currentOption.productName_like = null
    this.currentOption.roundDate = null
  }

  onResetFilter(dt) {
    this.initFilters()
    dt.reset()
  }

  prepareFilters(filters: any) {
    let _filters = {}
    _.each(filters, (it: any) => {
      let matchMode = it['matchMode']
      let value = it['value']
      if (value && value instanceof Date) {
        value = moment(value).format('YYYY-MM-DD')
      }
      _.assignIn(_filters, { [matchMode]: value })
    })

    return _.pickBy(_filters, _.identity)
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
          // this.loadProductRoundsLazy(this.currentLazyLoadEvent)
          this.initFilters()
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
          // this.loadProductRoundsLazy(this.currentLazyLoadEvent)
          this.initFilters()
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
        // this.loadProductRoundsLazy(this.currentLazyLoadEvent)
        this.initFilters()
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
