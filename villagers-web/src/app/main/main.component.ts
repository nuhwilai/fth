import { Component, OnInit, NgZone } from '@angular/core'
import { Router } from '@angular/router'

declare const gapi
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isAccept = false

  subDistrict = 'กะรน ( Karon )'
  sponsoredBy = [
    {
      imageURI:
        'https://www.bonmek.com/wp-content/uploads/2019/07/cropped-bonmekTransparent-1.png',
      link: 'https://www.bonmek.com',
    },
  ]
  bgImage =
    'https://www.karoncity.go.th/image/ratio/?file=files/com_travel/2017-09_3d79e0bfa456668.jpg&width=700&height=500'
  contracts = [
    { text: 'Winai Chidchiew' },
    { text: 'matilphuket@gmail.com' },
    { text: '083-1758822' },
    { text: 'Manosit Jangjob' },
    { text: 'manositjangjob@gmail.com' },
    { text: '098-7894191' },
  ]

  sponsoredGoogleSpreadSheetDatas: any[]
  constructor(private router: Router, private _ngZone: NgZone) {}

  ngOnInit(): void {
    this.getDataFromGoogleSpreadSheet()
  }

  getDataFromGoogleSpreadSheet() {
    const checkGAPI = setInterval(() => {
      if (gapi.client && gapi.client.sheets) {
        clearInterval(checkGAPI)
        gapi.client.sheets.spreadsheets.values
          .get({
            spreadsheetId: '1lpFr7KNOx5ljF3ElC-JQLgOHUa0rDgu99yDPUpQK9Hk',
            range: 'Sheet1',
          })
          .then((response) => {
            var result = response.result
            this._ngZone.run(() => {
              this.sponsoredGoogleSpreadSheetDatas = result.values
            })
          })
      }
    }, 500)
  }

  goToRegister() {
    this.router.navigate(['/register'])
  }

  goToRequestQrCode() {
    this.router.navigate(['/request-qr-code'])
  }
}
