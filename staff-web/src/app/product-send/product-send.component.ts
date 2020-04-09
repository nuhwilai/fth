import { Component, OnInit } from '@angular/core'
import { RecieverService } from '../reciever.service'
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import * as _ from 'lodash'
import { MessageService } from 'primeng/components/common/messageservice'
import { verifyJWTToken } from '../utils'

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
    timestamp: new FormControl(null),
    supplyId: new FormControl(null, Validators.required),
  })
  amount = 1
  supplyId
  staffData
  constructor(
    private recieverService: RecieverService,
    private route: ActivatedRoute,
    private messageService: MessageService,
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
    this.messageService.add({
      severity: 'error',
      detail: 'ค้นหากล้องไม่พบ',
    })
  }
  scanSuccessHandler($event) {
    this.clickCloseCamera()
    const stream =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJnZyIsIm5hdGlvbmFsSWQiOiIxMjM0IiwiYW1vdW50IjozLCJwaG9uZU51bWJlciI6IjA4OTk5OTk5OTkiLCJpYXQiOjE1ODY0NDAyOTAsImV4cCI6MTU4NzczNjI5MH0.be2Ef_yPVjVm6pHtfCvuczFUjie3JjO3CfglGSi37VbCgg5c2ovPLQCFgUyD4Kv67dFFcziWe2-2UzFiL1ApWlx_dUuE9cQjozbW9yBk3OmiTU_5FXzaTRQGwCG3LksCmmhQTzhdetmPmH1hXZP9NxsTNq0iVLlRCwQYs27onIEFUlebUAgAW_qUTOs9lmqyaCDEoMZUR8ThAeppEveGRDHuMtp_p6hDT2ZymGon2zdVoNc4mLqbYVkYXZeM__tJX3gJGoNLlbgvbAOtZ_VLbO5jGEH6OCTuOvKlCxfmTNiI9KUrtBLHbUeSzJsnjlWKcRzQuavY2mxCHrr5syFMiC3BVtytWtdZtLmgTtLUdp9dxz4d_f1IW_qxiRJYlrgWBSOPSMAAuUDmxlzfxjzLUTCknJi89MaOr8szxLHSd0bTeiC5u1sZ2aAYWFTcKWV1qL4b_hc4MZgGPkGdysWqipK_JpJ5JDWtajq1S_3YkLyoJItw5s4PcIuH_mjaUDEHuD9E9goKxegk4a-Me4NGaWqdzWmHsr5AdZy7JnbQBT2MSsigivMKAen-cqnadm_efVTaOySuM0oA3h8vIX8TkxhFTjrq3lhzhYl10JgRxKAmzXB1_PMPC35urdaq3IIkPgoGfB02bSe7_rezXVxIevpCAJyVevKhtFjfe9V0Myc'
    try {
      let decoded = verifyJWTToken(stream)
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
        timestamp: new Date(),
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
