import { Component, OnInit, Input } from '@angular/core'
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { environment } from '../../environments/environment'
@Component({
  selector: 'app-show-qr-code',
  templateUrl: './show-qr-code.component.html',
  styleUrls: ['./show-qr-code.component.scss'],
})
export class ShowQrCodeComponent implements OnInit {
  apiUrl = environment.apiUrl
  qrcodeToken: string;
  _id: string;
  data: any;
  constructor(private _location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.qrcodeToken = data.qrcodeToken
      this._id = data._id
      this.data = data
    })
  }

  back() {
    this._location.back()
  }
}
