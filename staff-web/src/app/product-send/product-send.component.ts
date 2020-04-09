import { Component, OnInit } from '@angular/core'
import { RecieverService } from '../reciever.service'
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

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
    foodCount: new FormControl(1),
    timestamp: new FormControl(new Date()),
    supplyId: new FormControl(null, Validators.required),
  })
  constructor(
    private recieverService: RecieverService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.scannerEnabled = false
    const id = this.route.snapshot.paramMap.get('id')
    this.txactionRecieveForm.patchValue({
      supplyId: id,
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
    console.log('$scanSuccessHandler :', $event)
    this.clickCloseCamera()

    const mockDataQR = {
      nationalId: '11111',
      phone: '0899999999',
    }
    this.recieverInfo = mockDataQR
    this.getRecieverInfo(mockDataQR)
    // this.getRecieverInfo($event);
  }

  getRecieverInfo(recieverInfo) {
    this.recieverService.getRecieverData(recieverInfo).subscribe((data) => {
      this.recieverInfo = data
    })
  }

  decreaseFoodCount() {
    this.txactionRecieveForm.patchValue({
      foodCount: this.txactionRecieveForm.value.foodCount - 1,
    })
  }
  increaseFoodCount() {
    this.txactionRecieveForm.patchValue({
      foodCount: this.txactionRecieveForm.value.foodCount + 1,
    })
  }

  submit() {
    console.log('submit :')
  }
}
