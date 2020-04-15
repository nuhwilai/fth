import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { IndexDbService } from './indb/index-db.service'
import { DataIndexedDbService } from './indb/data-indexed-db.service'

@Injectable({
  providedIn: 'root',
})
export class RecieverService {
  constructor(private http: HttpClient) {}

  getRecieverData(data) {
    // return new Observable((sub) => {
    //   setTimeout(() => {
    //     sub.next({
    //       nationalId: '11111',
    //       phone: '0899999999',
    //       firstname: 'Tharit',
    //       lastname: 'Wichiankoo',
    //       amount: 3,
    //     })
    //   }, 3000)
    // })
    return this.http.get(
      environment.restEndpointUrl + `/users/${data.nationalId}`,
    )
  }
}
