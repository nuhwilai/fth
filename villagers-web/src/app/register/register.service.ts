import { Injectable } from '@angular/core'
import { PagedRestfulService } from '../shared/pageRestful/page-restful.service'
import { ICreateUseRequestData } from './type'
import { of } from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private pRfS: PagedRestfulService) {}

  createUser(data: ICreateUseRequestData) {
    return of({
      _id: "1",
      qrcodeToken: '12345',
    })
    // return this.pRfS.createPagedRestful("users", data)
  }
}
