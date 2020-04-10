import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isAccept = false

  subDistrict = "กะรน ( Karon )"
  sponsoredBy = [
    {imageURI: "https://www.bonmek.com/wp-content/uploads/2019/07/cropped-bonmekTransparent-1.png", link: "https://www.bonmek.com"},
  ]
  bgImage = "https://www.karoncity.go.th/image/ratio/?file=files/com_travel/2017-09_3d79e0bfa456668.jpg&width=700&height=500"
  contracts = [
    {text: "07x-xxxxxxx"}
  ]
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToRegister(){
    this.router.navigate(['/register'])
  }

  goToRequestQrCode(){
    this.router.navigate(['/request-qr-code'])
  }
}
