import { Component, OnInit, Input } from '@angular/core'
import { UserService } from 'src/app/user/user.service'
import { IUser } from 'src/app/shared/models/user'
import { LazyLoadEvent } from 'primeng/api'
import * as moment from 'moment'
import * as _ from 'lodash'
import { createUserFullNameStr } from 'src/app/shared/models/extra'
import { ALLERGIES } from 'src/app/core/allergiesType'
import { DISEASE } from 'src/app/core/diseaseType'

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss'],
})
export class UserReportComponent implements OnInit {
  rows = 10
  rowsPerPageOptions = [10, 20, 50, 100]
  totalRecords: number
  users: IUser[]
  loading: boolean = true
  cols: any[] = []
  memberCols: any[] = []
  exportColumns: any[]
  currentOption: any = {}
  exporting: boolean = false
  _selectedColumns: any[] = []

  constructor(private userService: UserService) {
    // user cols
    this.cols = [
      { field: 'fullname', header: 'ชื่อ-สกุล' },
      { field: 'nationalId', header: 'หมายเลขบัตร' },
      { field: 'phoneNumber', header: 'เบอร์โทรศัพท์' },
      { field: 'homeNumber', header: 'บ้านเลขที่' },
      { field: 'homeMoo', header: 'หมู่ที่' },
      { field: 'homeMooban', header: 'หมู่บ้าน' },
    ]

    const allergyCols = _.map(ALLERGIES, (it) => ({
      field: it.key,
      header: it.value,
    }))
    const diseaseCols = _.map(DISEASE, (it) => ({
      field: it.key,
      header: it.value,
    }))

    const extraCols = [
      {
        field: 'memberCount',
        header: 'จำนวนสมาชิกรวมในครอบครัว',
      },
    ]
    this.cols = _.concat(this.cols, allergyCols, diseaseCols, extraCols)
    console.log('this.cols', this.cols)

    // member cols
    this.memberCols = _.concat(
      [
        {
          field: 'userNationalId',
          header: 'หมายเลขบัตรประจำตัวประชาชนหัวหน้าครอบครัว',
        },
        {
          field: 'firstname',
          header: 'ชื่อ',
        },
        {
          field: 'lastname',
          header: 'นามสกุล',
        },
        {
          field: 'nationalId',
          header: 'หมายเลขบัตรประจำตัวประชาชน',
        },
      ],
      allergyCols,
      diseaseCols,
    )
    console.log('this.memberCols', this.memberCols)
    // table selected columns
    this.selectedColumns = _.filter(this.cols, (it: any) =>
      _.includes(
        [
          'fullname',
          'nationalId',
          'phoneNumber',
          'NO_SEA_FOOD',
          'NO_MILK',
          'NO_BEAN',
          'NO_PORK',
          'NO_CHICKEN',
          'NO_MEAT',
          'DIABETES',
          'GOUT',
          'HEART_DISEASE',
          'BLOOD_PRESSURE',
          'memberCount',
        ],
        it.field,
      ),
    )
  }

  ngOnInit(): void {
    this.initFilters()
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col))
  }

  private initFilters() {
    this.currentOption.firstname_like = null
    this.currentOption.lastname_like = null
    this.currentOption.nationalId_like = null
    this.currentOption.phoneNumber_like = null
  }
  onResetFilter(dt: any) {
    this.initFilters()
    dt.reset()
  }

  private loadUsers(
    offset: number,
    max: number,
    filters?: any,
    sort?: string,
    order?: number,
  ) {
    this.loading = true
    let _filters = this.prepareFilters(filters)

    console.log('load users with filters', _filters)
    setTimeout(() => {
      this.userService
        .listUsers({})
        // .listUsers({ offset, max, ..._filters })
        .subscribe((res: IResponseSuccess) => {
          if (res.valid) {
            // console.log('res.data', res.data)
            this.users = this.prepareUsers(res.data.users)
            this.totalRecords = res.data.totalCount
            // this.users = res.data.users
            console.log('this.users', this.users)
          }
          this.loading = false
        })
    }, 0)
  }

  loadUsersLazy($event: LazyLoadEvent) {
    this.loadUsers(
      $event.first,
      $event.rows,
      $event.filters,
      $event.sortField,
      $event.sortOrder,
    )
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

  prepareUsers(users: IUser[]) {
    return _.map(users, (user: IUser) => {
      // console.log('user', user)
      let _user = {}
      let _allergies = this.createAllergiesObj(user)
      let _diseases = this.createDiseasesObj(user)
      _user = _.chain({})
        .extend(
          { fullname: createUserFullNameStr(user) },
          user,
          _allergies,
          _diseases,
          {
            memberCount: _.size(user.members),
          },
        )
        // .omit([
        //   '_id',
        //   'firstname',
        //   'lastname',
        //   'isUsePassport',
        //   'allergies',
        //   'diseases',
        // ])
        .value()
      return _user
    })
  }

  createAllergiesObj(user: any) {
    let _allergies = {}
    _.each(ALLERGIES, (it: { key: string; icon: string; value: string }) => {
      let sign = _.includes(_.get(user, 'allergies', []), it.key) ? '✔' : ''
      _.extend(_allergies, { [it.key]: sign })
    })
    return _allergies
  }

  createDiseasesObj(user: any) {
    let _diseases = {}
    _.each(DISEASE, (it: { key: string; icon: string; value: string }) => {
      let sign = _.includes(_.get(user, 'diseases', []), it.key) ? '✔' : ''
      _.extend(_diseases, { [it.key]: sign })
    })
    return _diseases
  }

  exportExcelByFilter() {
    this.userService.listUsers({}).subscribe((res: IResponseSuccess) => {
      if (res.valid) {
        const _users = this.prepareUsers(res.data.users)
        console.log('users', _users)

        this.exportExcel(
          _users,
          'รายงานผู้เข้าร่วมโครงการ',
          moment().format('DD-MM-YYYY'),
        )
      }
    })
  }

  exportExcel(users: any, fileName: string, date: string) {
    // TODO: members sheet

    let _members = []
    _.each(users, (user: any) => {
      console.log('user', user)
      if (user.members && _.size(user.members) > 0) {
        let _member = {}
        _.each(user.members, (member: any) => {
          _member = {
            userNationalId: _.get(user, 'nationalId', ''),
            firstname: _.get(member, 'firstname', ''),
            lastname: _.get(member, 'lastname', ''),
            nationalId: _.get(member, 'nationalId', ''),
          }

          let _allergies = this.createAllergiesObj(member)
          let _diseases = this.createDiseasesObj(member)
          _.extend(_member, _allergies)
          _.extend(_member, _diseases)
          // console.log('_allergies', _allergies)
          console.log('--->_member', _member)
          _members.push(_member)
        })
      }
    })
    let _users = _.map(users, (user) => {
      return _.pick(user, [
        'fullname',
        'nationalId',
        'phoneNumber',
        'homeNumber',
        'homeMoo',
        'homeMooban',
        'NO_SEA_FOOD',
        'NO_MILK',
        'NO_BEAN',
        'NO_PORK',
        'NO_CHICKEN',
        'NO_MEAT',
        'DIABETES',
        'GOUT',
        'HEART_DISEASE',
        'BLOOD_PRESSURE',
        'memberCount',
      ])
    })
    console.log('_members', _members)
    console.log('_users', _users)

    import('xlsx').then((xlsx) => {
      // users sheet
      let usersWorksheet = xlsx.utils.json_to_sheet(_users)
      usersWorksheet = this.changeWorksheetColumnName(
        xlsx,
        usersWorksheet,
        this.cols,
      )

      // member sheet
      let membersWorksheet = xlsx.utils.json_to_sheet(_members)
      membersWorksheet = this.changeWorksheetColumnName(
        xlsx,
        membersWorksheet,
        this.memberCols,
      )

      const workbook = {
        // WBProps: { CodeName: { users: 'XXX', members: 'yyy' } },
        Sheets: { users: usersWorksheet, members: membersWorksheet },
        SheetNames: ['users', 'members'],
        CodeNames: { users: 'XXX', members: 'yyy' },
      }
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      })
      this.saveAsExcelFile(excelBuffer, fileName, date)
    })
  }

  saveAsExcelFile(buffer: any, fileName: string, date): void {
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

  changeWorksheetColumnName(xlsx: any, worksheet: any, cols: any) {
    let _worksheet = worksheet
    var range = xlsx.utils.decode_range(_worksheet['!ref'])
    for (var C = range.s.c; C <= range.e.c; ++C) {
      var address = xlsx.utils.encode_col(C) + '1' // <-- first row, column number C
      if (!_worksheet[address]) continue
      const v = _worksheet[address].v
      const _address = _.chain(cols)
        .find((col: any) => col.field === v)
        .get('header', '')
        .value()
      _worksheet[address].v = _address
    }
    return _worksheet
  }
}
