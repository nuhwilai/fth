import { Component, OnInit } from '@angular/core'
import { RecieverService } from '../reciever.service'
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import * as _ from 'lodash'

@Component({
  selector: 'app-product-send',
  templateUrl: './product-send.component.html',
  styleUrls: ['./product-send.component.scss'],
})
export class ProductSendComponent implements OnInit {
  recieverInfo: any
  scannerEnabled = false
  desiredDevice = null
  txactionRecieveForm = new FormGroup({
    nationalId: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    // amount: new FormControl(1),
    timestamp: new FormControl(new Date()),
    supplyId: new FormControl(null, Validators.required),
  })
  amount = 1
  supplyId
  staffData
  constructor(
    private recieverService: RecieverService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.scannerEnabled = false
    this.supplyId = this.route.snapshot.paramMap.get('id')
    this.txactionRecieveForm.patchValue({
      supplyId: this.supplyId,
    })
  }

  clickOpenCamera() {
    this.scannerEnabled = true
  }
  clickCloseCamera() {
    this.desiredDevice = null
    this.scannerEnabled = false
  }

  camerasFoundHandler($event) {
    console.log('$event :', $event)
    this.desiredDevice = $event[0]
  }

  camerasNotFoundHandler($event) {
    console.log('$camerasNotFoundHandler :', $event)
  }
  scanSuccessHandler($event) {
    this.clickCloseCamera()
    const mockDataQR = {
      nationalId: '11111',
      phone: '0899999999',
    }
    this.recieverInfo = mockDataQR
    this.txactionRecieveForm.patchValue(this.recieverInfo)
    this.getRecieverInfo(mockDataQR)
    // this.getRecieverInfo($event);
  }

  getRecieverInfo(recieverInfo) {
    this.recieverService.getRecieverData(recieverInfo).subscribe((data) => {
      const newData = _.omit(data, ['amount'])
      this.recieverInfo = data
      this.txactionRecieveForm.patchValue(newData)
    })
  }

  decreaseFoodCount() {
    this.amount--
  }
  increaseFoodCount() {
    this.amount++
  }

  submit() {
    if (this.txactionRecieveForm.invalid) {
      return
    }
    this.recieverService
      .createRecieveTxn({
        ...this.txactionRecieveForm.value,
        amount: this.amount,
      })
      .then(
        (data) => {
          console.log('data :', data)
          this.clearData()
        },
        (error) => {
          console.log('error :', error)
        },
      )
  }

  clearData() {
    this.amount = 1
    this.recieverInfo = null
    this.txactionRecieveForm.reset()
    this.txactionRecieveForm.patchValue({
      supplyId: this.supplyId,
    })
  }
}
