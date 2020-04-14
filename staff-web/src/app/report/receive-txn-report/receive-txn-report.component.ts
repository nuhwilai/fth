import { Component, OnInit } from '@angular/core'
import { ReceiveTxnService } from 'src/app/receive-txn/receive-txn.service'
import * as _ from 'lodash'
@Component({
  selector: 'app-receive-txn-report',
  templateUrl: './receive-txn-report.component.html',
  styleUrls: ['./receive-txn-report.component.scss'],
})
export class ReceiveTxnReportComponent implements OnInit {
  constructor(private receiveTxnService: ReceiveTxnService) {}
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
  ]

  ngOnInit() {
    this.receiveTxnService
      .listReceiveTxns({ __withUserSchema: 'short' })
      .subscribe((res: IResponseSuccess) => {
        if (res.valid) {
          console.log('receiveTxns', res.data.receiveTxns)
          let products = _.chain(res.data.receiveTxns)
            .map('productId')
            .uniq()
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
            field: it,
            header: it,
          }))

          let results = _.map(userByTxns, (v, k) => {
            console.log('k', k, 'v', v)
            const _user = _.find(users, (it) => it.nationalId === k)
            const _name = this.createUserFullNameStr(_user)
            const _phoneNumber = _.get(_user, 'phoneNumber', '-')
            const _address = this.createUserAddressStr(_user)
            let result = {
              name: _name,
              phoneNumber: _phoneNumber,
              address: _address,
            }

            _.each(productCols, (col) => {
              const amount = _.chain(v)
                .filter((txn) => txn.productId === col.field)
                .sumBy('amount')
                .value()
              console.log('--> amount', amount)
              result = _.assignIn(result, { [col.header]: amount })
            })

            return result
          })

          console.log('products', products)
          console.log('product cols', productCols)
          console.log('users', users)
          console.log('userByTxns', userByTxns)
          console.log('results', results)

          this.exportExcel(results, 'x', this.cols)
        }
      })
  }

  exportExcel(entries: any, fileName: string, cols) {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(entries)
      var range = xlsx.utils.decode_range(worksheet['!ref'])
      for (var C = range.s.c; C <= range.e.c; ++C) {
        var address = xlsx.utils.encode_col(C) + '1' // <-- first row, column number C
        if (!worksheet[address]) continue
        const v = worksheet[address].v
        const _address = _.chain(cols)
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
      this.saveAsExcelFile(excelBuffer, fileName, new Date().toISOString())
    })
  }

  saveAsExcelFile(buffer: any, fileName, date): void {
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

  createUserAddressStr(user: any) {
    if (!user) return '-'
    return `${_.get(user, 'homeNumber', '-')} หมู่ ${_.get(
      user,
      'homeMoo',
      '-',
    )} หมู่บ้าน ${_.get(user, 'homeMooban', '-')} ต. ${_.get(
      user,
      'homeSubDistrict',
      '-',
    )} อ. ${_.get(user, 'homeDistrict', '-')} จ. ${_.get(
      user,
      'homeProvince',
      '-',
    )} ${_.get(user, 'homePostalCode', '-')}
    `
  }

  createUserFullNameStr(user) {
    if (!user) return '-'
    return `${_.get(user, 'firstname', '')} ${_.get(user, 'lastname', '')}`
  }
}
