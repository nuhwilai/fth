import { Component, OnInit, Input } from '@angular/core'
import { ALLERGIES } from '../core/allergiesType'
import { DISEASE } from '../core/diseaseType'

@Component({
  selector: 'app-reciever-info',
  templateUrl: './reciever-info.component.html',
  styleUrls: ['./reciever-info.component.scss'],
})
export class RecieverInfoComponent implements OnInit {
  @Input() set recieverInfo(data) {
    // this.recieverData = data
    // this.prepareData(data)
  }

  recieverData = {
    firstname: 'ธนพนธ์',
    lastname: 'ท่อประสิทธิ์',
    isUsePassport: false,
    nationalId: '1100801188111',
    phoneNumber: '0993023911',
    homeNumber: '3/186',
    homeMoo: '2',
    homePostalCode: '90000',
    homeSubDistrict: 'เขารูปช้าง',
    homeDistrict: 'เมือง',
    homeProvince: 'สงขลา',
    allergies: ['NO_SEA_FOOD', 'NO_MEAT'],
    diseases: ['GOUT'],
    remark: 'ต้องการผ้าปูที่นอนเสื่อหมอนฟูก',
  }
  members = [
    {
      isUsePassport: 'false',
      firstname: 'ธนพนธ์2222',
      lastname: 'ท่อประสิทธิ์222',
      nationalId: '1100801188111',
      allergies: ['NO_MEAT', 'NO_CHICKEN', 'NO_SEA_FOOD'],
      diseases: ['DIABETES', 'HEART_DISEASE'],
    },
  ]
  ALLERGIES
  DISEASE
  constructor() {}

  ngOnInit() {
    this.ALLERGIES = ALLERGIES
    this.DISEASE = DISEASE
  }

  prepareData(data) {
    if (data) {
      this.members = data.members
    }
  }
}
