import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ProductRoundService } from '../product-round.service'

@Component({
  selector: 'app-product-round-crud',
  templateUrl: './product-round-crud.component.html',
  styleUrls: ['./product-round-crud.component.scss'],
})
export class ProductRoundCrudComponent implements OnInit {
  displayDialog: boolean

  productRound: IProductRound
  newProductRound: boolean
  productRoundList: any[]
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
  constructor(private productRoundService: ProductRoundService) {}

  ngOnInit() {
    this.productRoundForm = new FormGroup({
      _id: new FormControl(null),
      productName: new FormControl(null, [Validators.required]),
      roundDateTime: new FormControl(null, [Validators.required]),
    })

    this.initFilters()
  }

  private refreshData() {
    this.loading = true
    this.productRoundService
      .listProductRounds()
      .subscribe(({ productRounds }: IProductRoundSuccessData) => {
        this.productRoundList = productRounds
        this.loading = false
        console.log('this.productRoundList', this.productRoundList)
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
      this.productRoundService
        .listProductRounds({})
        .subscribe((data: IResponseSuccess) => {
          if (data.valid) {
            let productRounds = data.data.productRounds
            this.productRoundList = productRounds
            console.log('this.productRoundList', this.productRoundList)
            this.totalRecords = productRounds.length
          }
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
      let _value = this.productRoundForm.value
      this.productRoundService.createProductRound(_value).subscribe(() => {
        this.refreshData()
      })
    } else {
      let _id = this.productRound._id
      delete this.productRound._id
      this.productRoundService
        .updateProductRound(_id, this.productRoundForm.value)
        .subscribe(() => {
          this.refreshData()
        })
    }
    this.productRound = this.formInitialValue
    this.displayDialog = false
    this.submitted = false
  }

  delete() {
    this.productRoundService
      .deleteProductRound(this.productRound._id)
      .subscribe(({ _id }) => {
        if (_id) {
          this.refreshData()
        } else {
        }
        delete this.productRound
      })
    this.displayDialog = false
    this.submitted = false
  }
}
