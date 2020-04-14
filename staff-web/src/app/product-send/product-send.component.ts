import { Component, OnInit, ViewChild } from '@angular/core'
import { RecieverService } from '../reciever.service'
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import * as _ from 'lodash'
import { MessageService } from 'primeng/components/common/messageservice'
import { verifyJWTToken } from '../utils'
import { IndexDbService } from '../indb/index-db.service'
import { ZXingScannerComponent } from '@zxing/ngx-scanner'

@Component({
  selector: 'app-product-send',
  templateUrl: './product-send.component.html',
  styleUrls: ['./product-send.component.scss'],
})
export class ProductSendComponent implements OnInit {
  @ViewChild('scanner', { static: true })
  scanner: ZXingScannerComponent

  recieverInfo: any
  scannerEnabled = false
  desiredDevice = null
  txactionRecieveForm = new FormGroup({
    nationalId: new FormControl('', Validators.required),
    receivedDateTime: new FormControl(null),
    productId: new FormControl(null, Validators.required),
  })
  amount = 1
  supplyId
  staffData

  txnRequireCount = 0
  cameras: any

  constructor(
    private recieverService: RecieverService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private indexDbService: IndexDbService,
  ) {}

  ngOnInit() {
    this.scannerEnabled = false
    this.supplyId = this.route.snapshot.paramMap.get('id')
    this.txactionRecieveForm.patchValue({
      productId: this.supplyId,
    })

    this.indexDbService.getTxnCount().subscribe((number: number) => {
      this.txnRequireCount = number
    })
  }

  clickOpenCamera($event) {
    this.scannerEnabled = true
  }
  clickCloseCamera($event) {
    this.desiredDevice = null
    this.scannerEnabled = false
    // this.scanner.reset()
  }

  camerasFoundHandler($event) {
    console.log('$event :', $event)
    this.cameras = $event
    this.desiredDevice = $event[0]
  }

  camerasNotFoundHandler($event) {
    console.log('$camerasNotFoundHandler :', $event)
    this.messageService.add({
      severity: 'error',
      detail: 'ค้นหากล้องไม่พบ',
    })
  }
  scanSuccessHandler($event) {
    this.clickCloseCamera(null)
    try {
      let decoded = verifyJWTToken($event)
      this.recieverInfo = decoded
      this.txactionRecieveForm.patchValue(this.recieverInfo)
      this.getRecieverInfo(decoded)
    } catch (err) {
      this.messageService.add({
        severity: 'error',
        detail: 'ไม่สามารถอ่าน jwt ได้',
      })
      return
    }
  }

  getRecieverInfo(recieverInfo) {
    this.recieverService
      .getRecieverData(recieverInfo)
      .subscribe((data: any) => {
        if (data.valid) {
          const newData = _.omit(data.data.user, ['amount'])
          this.recieverInfo = data.data.user
          this.txactionRecieveForm.patchValue(newData)
        }
      })
  }

  decreaseFoodCount() {
    if (this.amount > 0) {
      this.amount--
    }
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
        () => {
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
      productId: this.supplyId,
    })
  }
  toggleCamera = (
    currentCamera: MediaDeviceInfo,
    cameras: MediaDeviceInfo[],
  ) => {
    console.log('cameras', cameras)
    console.log('currentCamera', currentCamera)

    if (cameras && cameras.length == 2 && currentCamera) {
      // use _.xorBy e.g. assert _.xor([1,2], [2]) == [1]
      this.desiredDevice = _.chain(cameras)
        .xorBy([currentCamera], 'deviceId')
        .first()
        .value()
      console.log('toggle to camera', this.desiredDevice)
    }
  }
}
