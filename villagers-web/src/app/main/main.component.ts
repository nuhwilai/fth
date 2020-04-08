import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  subDistrict = "กะรน ( Karon )"
  sponsoredBy = [
    {imageURI: "https://www.bonmek.com/wp-content/uploads/2019/07/cropped-bonmekTransparent-1.png"},
  ]
  isAccept = false
  constructor() { }

  ngOnInit(): void {
  }

}
