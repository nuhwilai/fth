import { Component, OnInit } from '@angular/core';
import { QrScanService } from '../qr-scan.service';

@Component({
  selector: 'app-supply-send',
  templateUrl: './supply-send.component.html',
  styleUrls: ['./supply-send.component.css'],
})
export class SupplySendComponent implements OnInit {
  recieverInfo: any;
  constructor(private qrScan: QrScanService) {}

  ngOnInit() {
    this.recieverInfo = this.qrScan.readScanner().subscribe((data) => {
      console.log('data :', data);
    });
  }

  clickOpenCamera() {
    this.qrScan.openCamera();
  }
}
