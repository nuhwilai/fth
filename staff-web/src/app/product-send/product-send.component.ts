import { Component, OnInit } from '@angular/core'
import { RecieverService } from '../reciever.service'
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import * as _ from 'lodash'
import { MessageService } from 'primeng/components/common/messageservice'
import { verifyJWTToken } from '../utils'
import { IndexDbService } from '../indb/index-db.service'

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

  txnRequireCount = 0
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
      supplyId: this.supplyId,
    })

    this.indexDbService.getTxnCount().subscribe((number: number) => {
      this.txnRequireCount = number
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
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJnZyIsIm5hdGlvbmFsSWQiOiIxMjM0NTY3ODkwMTIxIiwiYW1vdW50IjozLCJwaG9uZU51bWJlciI6IjA4OTExMTExMTEiLCJpYXQiOjE1ODY0NDMzMzksImV4cCI6MTU4NzczOTMzOX0.0vSjiO9uXL6W6TeBNtJGLTEPDjLOPvQs29t-fqvOq2Zu_A0doTPo3oJ7ChvxsBAhH9GDF2fE_iTEJqcRhO_lxrzQ9Gqe0H_nJoYXeU759qgo8-wGVqB-cJntK5CznO6YZ47XqSLxAbPI3YfBKRkn7Yttx2EW9i6wIjokeCPD_xmNp0YNoRzYSWQ1pO9DOxbSM2DevkeduE4EvgrKreDe16kkv54_G83TS-9uxEApB12OLChv3oHD0kHsW8lQzIEhzncqsGIC_xiTdCydNfZEgl34LEvpiWcTJZW0_Ps50GUYGWhEuuZhqDNJnnagOybdncgCVORy-Q93GibNRiKlI-pzI_KV4JnLkXMrTYf3b8bggw7fNf8Ay2hvlpgpfjj7RIn_E5rSX0tP1A-txpbG-MN5O90umrGp6nm9CyNstK9rZxmpz2LKVOZ0tOCcF2iVkOjUNesYmgbZ1CPOXqnB0eKTNFQT-9-6TOYq1QOqEfPWJJl7I7aOuLffETasj_w2ZSi4s4hEMctwiKhA5hIUw-HzxZ6QfWXSP8VniyR4fPNO9IHN_ZiBazPmCYOk4A8n6InQhc1Sny_jzp6D7-zubOU8LYdrOUBce9gpxGgcuruaQzswV0RIe95zVVh4fq--YkcLC2zDECCBFGaCEYksxBbY_eQvxAbfyl6oziTgYIg'
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
      supplyId: this.supplyId,
    })
  }
}
