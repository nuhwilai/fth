import { Component, OnInit, ViewChild } from '@angular/core'
import { RecieverService } from '../reciever.service'
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import * as _ from 'lodash'
import { MessageService } from 'primeng/components/common/messageservice'
import { verifyJWTToken } from '../utils'
import { ZXingScannerComponent } from '@zxing/ngx-scanner'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import {
  ReceiveTxnService,
  ITxnSubject,
} from '../receive-txn/receive-txn.service'

@Component({
  selector: 'app-product-send',
  templateUrl: './product-send.component.html',
  styleUrls: ['./product-send.component.scss'],
})
export class ProductSendComponent implements OnInit {
  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent
  unsubscribe$ = new Subject()
  recieverInfo: any
  scannerEnabled = false
  currentDevice = null
  txactionRecieveForm = new FormGroup({
    nationalId: new FormControl('', Validators.required),
    receivedDateTime: new FormControl(null),
    productId: new FormControl(null, Validators.required),
  })
  amount = 1
  supplyId
  staffData
  availableDevices: MediaDeviceInfo[]
  txnRequireCount
  currentDeviceIndex: number
  constructor(
    private recieverService: RecieverService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private receiveTxnService: ReceiveTxnService,
  ) {}

  ngOnInit() {
    this.scannerEnabled = false
    this.supplyId = this.route.snapshot.paramMap.get('id')
    this.txactionRecieveForm.patchValue({
      productId: this.supplyId,
    })
    this.receiveTxnService
      .getSyncUpTxn$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((surveySubjectResult: ITxnSubject) => {
        this.txnRequireCount = surveySubjectResult.txnCount
      })
  }

  clickOpenCamera($event) {
    this.scannerEnabled = true
  }
  clickCloseCamera($event) {
    this.currentDevice = null
    this.scannerEnabled = false
  }

  camerasFoundHandler(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices
  }

  camerasNotFoundHandler($event) {
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
    this.receiveTxnService
      .createReceiveTxn({
        ...this.txactionRecieveForm.value,
        amount: this.amount,
      })
      .then(
        (result: any) => {
          if (result && result.valid) {
            this.messageService.add({
              severity: 'success',
              detail: 'บันทึกสำเร็จ',
            })
            this.clearData()
          } else {
            this.messageService.add({
              severity: 'error',
              detail: `บันทึกไม่สำเร็จ ${
                result.reason ? result.reason : 'ไม่พบสาเหตุ'
              }`,
            })
          }
        },
        (error) => {
          console.log('error :', error)
          this.messageService.add({
            severity: 'error',
            detail: `บันทึกไม่สำเร็จ ${error.message}`,
          })
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
  nextDevice = () => {
    const nextIndex =
      (this.currentDeviceIndex + 1) % _.size(this.availableDevices)
    this.currentDeviceIndex = nextIndex
    console.log('next device index', nextIndex)
    this.scanner.device = this.availableDevices[nextIndex]
  }

  deviceChange(device: MediaDeviceInfo) {
    if (this.currentDeviceIndex === undefined) {
      this.currentDeviceIndex = _.findIndex(
        this.availableDevices,
        (it: any) => it.deviceId == device.deviceId,
      )
    }
  }
}
