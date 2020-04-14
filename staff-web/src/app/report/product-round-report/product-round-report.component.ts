import { Component, OnInit } from '@angular/core'
import { ProductRoundService } from 'src/app/product-round/product-round.service'
import * as moment from 'moment'
import * as _ from 'lodash'

@Component({
  selector: 'app-product-round-report',
  templateUrl: './product-round-report.component.html',
  styleUrls: ['./product-round-report.component.scss'],
})
export class ProductRoundReportComponent implements OnInit {
  rows = 10
  rowsPerPageOptions = [10, 20, 50, 100, 200]
  totalRecords: number
  productRounds: IProductRound[]
  loading: boolean = true
  cols: any[]
  exportColumns: any[]
  currentOption: any = {}
  exporting: boolean = false

  constructor(private productRoundService: ProductRoundService) {
    this.cols = [
      { field: 'productName', header: 'ชื่อรายการ	' },
      { field: 'roundDateTime', header: 'รอบวันที่' },
    ]
    // console.log('selected columns', this.selectedColumns)
  }

  ngOnInit(): void {
    this.initFilters()
  }

  private initFilters() {
    this.currentOption.productName = null
    this.currentOption.roundDateTime = null
  }
  onResetFilter(dt: any) {
    this.initFilters()
    dt.reset()
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

    console.log('load product round with filters', _filters)
    setTimeout(() => {
      this.productRoundService
        .listProductRounds({ offset, max, ..._filters })
        .subscribe((res: IResponseSuccess) => {
          if (res.valid) {
            // this.productRounds = res.data.productRounds
            this.productRounds = this.prepareProductRounds(
              res.data.productRounds,
            )
            this.totalRecords = this.productRounds.length
            console.log('this.productRounds', this.productRounds)
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

  prepareProductRounds = (rounds: IProductRound[]) => {
    return rounds.map((it) => this.parseRoundDateTime(it))
  }

  parseRoundDateTime = (productRound: IProductRound) => {
    return {
      ...productRound,
      roundDateTime: new Date(productRound.roundDateTime),
    }
  }

  prepareFilters(filters: any) {
    // console.log('filters', filters)
    let _filters = {}
    // let _data = {}
    _.each(filters, (it: any) => {
      let matchMode = it['matchMode']
      let value = it['value']
      if (value && value instanceof Date) {
        // value = value.toISOString()
        // value = moment(value).startOf('day').toDate().toISOString()
      }
      _.assignIn(_filters, { [matchMode]: value })
    })

    return _.pickBy(_filters, _.identity)
  }

  exportExcelByFilter(productRound: IProductRound) {
    // const _filters = this.prepareFilters(filters)
    // // console.log('filters', filters)
    // // console.log('_filters', _filters)
    // this.surevyEntryService
    //   .listSurveyEntries(_filters)
    //   .subscribe((res: any) => {
    //     if (res.valid) {
    //       const entries = this.prepareSurveyEntries(res.data.surveyEntries)
    //       // console.log('export by filter', entries)
    //       this.exportExcel(entries, '', new Date())
    //     }
    //   })
  }

  exportExcel(entries: any, fileName: string, date: Date) {
    // import('xlsx').then((xlsx) => {
    //   const worksheet = xlsx.utils.json_to_sheet(entries)
    //   var range = xlsx.utils.decode_range(worksheet['!ref'])
    //   for (var C = range.s.c; C <= range.e.c; ++C) {
    //     var address = xlsx.utils.encode_col(C) + '1' // <-- first row, column number C
    //     if (!worksheet[address]) continue
    //     const v = worksheet[address].v
    //     const _address = _.find(this.cols, (col: any) => col.field === v)
    //       ?.header
    //     worksheet[address].v = _address
    //   }
    //   const workbook = {
    //     Sheets: { data: worksheet },
    //     SheetNames: ['data'],
    //   }
    //   const excelBuffer: any = xlsx.write(workbook, {
    //     bookType: 'xlsx',
    //     type: 'array',
    //   })
    //   this.saveAsExcelFile(excelBuffer, fileName, date)
    // })
  }

  saveAsExcelFile(buffer: any, fileName: string, date: Date): void {
    // import('file-saver').then((FileSaver) => {
    //   let EXCEL_TYPE =
    //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    //   let EXCEL_EXTENSION = '.xlsx'
    //   const data: Blob = new Blob([buffer], {
    //     type: EXCEL_TYPE,
    //   })
    //   FileSaver.saveAs(
    //     data,
    //     fileName + '_' + moment(date).format('DD-MM-YYYY') + EXCEL_EXTENSION,
    //   )
    //   this.exporting = false
    // })
  }
}