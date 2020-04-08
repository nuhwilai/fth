import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QrScanService {
  constructor() {}

  readScanner() {
    return new Observable((sub) => {
      sub.next({});
    });
  }

  openCamera() {}
}
