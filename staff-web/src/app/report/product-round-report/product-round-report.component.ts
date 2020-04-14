import { Component, OnInit } from '@angular/core'
import { ProductRoundService } from 'src/app/product-round/product-round.service'
import * as moment from 'moment'
import * as _ from 'lodash'
import { ReceiveTxnService } from 'src/app/receive-txn/receive-txn.service'

interface FILE_META {
  fileName: string
  date: string
  totalAmount: number
  cols: any
}
@Component({
  selector: 'app-product-round-report',
  templateUrl: './product-round-report.component.html',
  styleUrls: ['./product-round-report.component.scss'],
})
export class ProductRoundReportComponent implements OnInit {
  rows = 10
  rowsPerPageOptions = [10, 20, 50, 100]
  totalRecords: number
  productRounds: IProductRound[]
  loading: boolean = true
  cols: any[]
  exportColumns: any[]
  currentOption: any = {}
  exporting: boolean = false

  receiveTxnCols = [
    {
      field: 'name',
      header: 'ชื่อ-สกุล',
    },
    {
      field: 'address',
      header: 'ที่อยู่',
    },
    {
      field: 'nationalId',
      header: 'หมายเลขบัตร',
    },
    {
      field: 'phoneNumber',
      header: 'เบอร์โทรศัพท์',
    },
    {
      field: 'amount',
      header: 'จำนวน',
    },
    {
      field: 'receivedDateTime',
      header: 'เวลารับของ',
    },
  ]

  constructor(
    private productRoundService: ProductRoundService,
    private receiveTxnService: ReceiveTxnService,
  ) {
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
    this.currentOption.roundDate = null
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
            console.log('res.data', res.data)
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
      roundDateTime: moment(productRound.roundDateTime).format('DD-MM-YYYY'),
    }
  }

  prepareFilters(filters: any) {
    // console.log('filters', filters)
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

  exportExcelByFilter(productRound: IProductRound) {
    // TODO: fetch receive txn by product round
    const { _id, roundDate, productName } = productRound
    this.receiveTxnService
      .listReceiveTxns({ productId: _id, __withUserSchema: 'short' })
      .subscribe((res: IResponseSuccess) => {
        if (res.valid) {
          console.log('receiveTxns', res.data)
          let txns = _.chain(res.data.receiveTxns)
            .map((it) => {
              const _name = `${_.get(it.user, 'firstname', '')} ${_.get(
                it.user,
                'lastname',
                '',
              )}`
              const _address = `${_.get(
                it.user,
                'homeNumber',
                '-',
              )} หมู่ ${_.get(it.user, 'homeMoo', '-')} หมู่บ้าน ${_.get(
                it.user,
                'homeMooban',
                '-',
              )} ต. ${_.get(it.user, 'homeSubDistrict', '-')} อ. ${_.get(
                it.user,
                'homeDistrict',
                '-',
              )} จ. ${_.get(it.user, 'homeProvince', '-')} ${_.get(
                it.user,
                'homePostalCode',
                '-',
              )}
              `
              return {
                name: _name,
                address: _address,
                nationalId: _.get(it, 'nationalId', ''),
                phoneNumber: _.get(it, 'phoneNumber', ''),
                amount: _.get(it, 'amount', ''),
                receivedDateTime: moment(it.receivedDateTime).format(
                  'DD-MM-YYYY HH:ss',
                ),
              }
            })
            .value()
          let totalAmount = _.sumBy(txns, (it) => it.amount)
          console.log('txts', txns)
          let meta = {
            fileName: productName,
            date: moment(roundDate).format('DD-MM-YYYY'),
            totalAmount: totalAmount,
            cols: this.receiveTxnCols,
          }
          this.exportExcel(txns, meta)
        }
      })
  }

  exportExcel(entries: any, meta: FILE_META) {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(entries)
      var range = xlsx.utils.decode_range(worksheet['!ref'])
      for (var C = range.s.c; C <= range.e.c; ++C) {
        var address = xlsx.utils.encode_col(C) + '1' // <-- first row, column number C
        if (!worksheet[address]) continue
        const v = worksheet[address].v
        const _address = _.chain(meta.cols)
          .find((col: any) => col.field === v)
          .get('header', '')
          .value()
        worksheet[address].v = _address
      }
      const workbook = {
        Sheets: { data: worksheet },
        SheetNames: ['data'],
      }
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      })
      this.saveAsExcelFile(excelBuffer, meta)
    })
  }

  saveAsExcelFile(buffer: any, meta: FILE_META): void {
    const { fileName, date, totalAmount } = meta
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
      let EXCEL_EXTENSION = '.xlsx'
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      })
      FileSaver.saveAs(
        data,
        fileName + '_' + date + '_' + `จำนวน_${totalAmount}` + EXCEL_EXTENSION,
      )
      this.exporting = false
    })
  }
}
