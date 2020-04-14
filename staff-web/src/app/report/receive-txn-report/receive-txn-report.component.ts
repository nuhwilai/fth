import { Component, OnInit } from '@angular/core'
import { ReceiveTxnService } from 'src/app/receive-txn/receive-txn.service'
import * as _ from 'lodash'
import * as moment from 'moment'
import {
  createUserFullNameStr,
  createUserAddressStr,
} from 'src/app/shared/models/extra'
@Component({
  selector: 'app-receive-txn-report',
  templateUrl: './receive-txn-report.component.html',
  styleUrls: ['./receive-txn-report.component.scss'],
})
export class ReceiveTxnReportComponent implements OnInit {
  constructor(private receiveTxnService: ReceiveTxnService) {}
  today: Date = new Date()
  exporting: boolean = false
  cols = [
    {
      field: 'name',
      header: 'ชื่อ-สกุล',
    },
    {
      field: 'phoneNumber',
      header: 'เบอร์โทรศัพท์',
    },
    {
      field: 'address',
      header: 'ที่อยู่',
    },
    {
      field: 'totalAmount',
      header: 'รวม',
    },
  ]

  ngOnInit() {}

  exportExcelByFilter(date: any) {
    if (!date) {
      console.log('date is null')
      return
    }
    this.receiveTxnService
      .listReceiveTxns({
        __withUserSchema: 'short',
        __withProductRoundSchema: 'full',
        receivedDate: moment(date).format('YYYY-MM-DD'),
      })
      .subscribe((res: IResponseSuccess) => {
        if (res.valid) {
          console.log('receiveTxns', res.data.receiveTxns)
          let products = _.chain(res.data.receiveTxns)
            .map('productRound')
            .uniqBy('_id')
            .value()
          let users = _.chain(res.data.receiveTxns)
            .map((it) => it.user)
            .compact()
            .value()
          let userByTxns = _.groupBy(
            res.data.receiveTxns,
            (it: any) => it.nationalId,
          )
          let productCols = _.map(products, (it) => ({
            field: _.get(it, '_id'),
            header: _.get(it, 'productName'),
          }))

          this.cols = _.concat(this.cols, productCols)
          let results = _.map(userByTxns, (v, k) => {
            console.log('k', k, 'v', v)
            const _user = _.find(users, (it) => it.nationalId === k)
            const _name = createUserFullNameStr(_user)
            const _phoneNumber = _.get(_user, 'phoneNumber', '-')
            const _address = createUserAddressStr(_user)
            let result = {
              name: _name,
              phoneNumber: _phoneNumber,
              address: _address,
            }

            let rowTotalAmount = 0
            _.each(productCols, (col) => {
              const amount = _.chain(v)
                .filter((txn) => txn.productId === col.field)
                .sumBy('amount')
                .value()
              console.log(`${col.header} จำนวน ${amount}`)
              rowTotalAmount += amount
              result = _.assignIn(result, { [col.field]: amount })
            })

            result = _.assignIn(result, { totalAmount: rowTotalAmount })

            return result
          })

          console.log('products', products)
          console.log('product cols', productCols)
          console.log('this.cols', this.cols)
          console.log('users', users)
          console.log('userByTxns', userByTxns)
          console.log('results', results)

          this.exportExcel(
            results,
            'รายงานการรับของรายบุคคล',
            moment(date).format('DD-MM-YYYY'),
            this.cols,
          )
        }
      })
  }

  exportExcel(entries: any, fileName: string, date: string, cols: any) {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(entries)
      var range = xlsx.utils.decode_range(worksheet['!ref'])
      for (var C = range.s.c; C <= range.e.c; ++C) {
        var address = xlsx.utils.encode_col(C) + '1' // <-- first row, column number C
        if (!worksheet[address]) continue
        const v = worksheet[address].v
        const _address = _.chain(cols)
          .find((col: any) => col.field === v)
          .get('header', '-')
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
      this.saveAsExcelFile(excelBuffer, fileName, date)
    })
  }

  saveAsExcelFile(buffer: any, fileName: string, date: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
      let EXCEL_EXTENSION = '.xlsx'
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      })
      FileSaver.saveAs(data, fileName + '_' + date + EXCEL_EXTENSION)
      this.exporting = false
    })
  }
}
