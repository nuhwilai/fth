import { Component, OnInit, Input } from '@angular/core'
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-show-qr-code',
  templateUrl: './show-qr-code.component.html',
  styleUrls: ['./show-qr-code.component.scss'],
})
export class ShowQrCodeComponent implements OnInit {
  constructor(private _location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      console.log(data)
    })
  }

  back() {
    this._location.back()
  }
}
