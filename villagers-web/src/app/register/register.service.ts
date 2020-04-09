import { Injectable } from '@angular/core'
import { PagedRestfulService } from '../shared/pageRestful/page-restful.service'
import { ICreateUseRequestData } from './type'
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private pRfS: PagedRestfulService) {}

  createUser(data: ICreateUseRequestData) {
    return this.pRfS.createPagedRestful("users", data)
  }
}
