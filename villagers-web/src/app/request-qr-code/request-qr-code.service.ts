import { Injectable } from '@angular/core'
import { PagedRestfulService } from '../shared/pageRestful/page-restful.service'

@Injectable({
  providedIn: 'root',
})
export class RequestQrCodeService {
  constructor(private pRfS: PagedRestfulService) {}

  requestQrCode(data) {
    return this.pRfS.createPagedRestful('requestQrToken', data)
  }
}
