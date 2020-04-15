import { Component, OnInit, NgZone } from '@angular/core'
import { Router } from '@angular/router'
import { GoogleSpreadSheetService } from '../shared/google-spread-sheet.service'
import { environment } from 'src/environments/environment'

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
  contracts = []

  sponsoredGoogleSpreadSheetDatas: any[]
  constructor(
    private router: Router,
    private googleSpreadSheetService: GoogleSpreadSheetService,
  ) {}

  ngOnInit(): void {
    this.getDataFromGoogleSpreadSheet()
  }

  getDataFromGoogleSpreadSheet() {
    this.googleSpreadSheetService
      .getSpreadSheet(environment.googleSpreadSheetPublicId)
      .subscribe((data) => {
        this.sponsoredGoogleSpreadSheetDatas = this.csvToArray(data)
      })
  }

  goToRegister() {
    this.router.navigate(['/register'])
  }

  goToRequestQrCode() {
    this.router.navigate(['/request-qr-code'])
  }

  
  csvToArray(csvString) {
    let lines = csvString.split('\n');
    let results = []
    lines.forEach(line => {
      let array = line.split(',')
      if(array.length > 3){
        let values = {
          name: array[0],
          description: `${array[1].replace(`"`,"")},${array[2].replace(`"`,"")}`,
          date: array[3]
        }
        results.push(values)
      }else{
        let values = {
          name: array[0],
          description: array[1],
          date: array[2]
        }
        results.push(values)
      }
    });  
    return results
  }
}
