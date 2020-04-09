import { Injectable } from '@angular/core'
import { PagedRestfulService } from '../shared/pageRestful/page-restful.service'
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RequestQrCodeService {
  constructor(private pRfS: PagedRestfulService) {}

  requestQrCode(data) {
    return of({
      _id: '1',
      qrcodeToken: '12345',
    })
    // return this.pRfS.createPagedRestful('requestQrToken', data)
  }
}
