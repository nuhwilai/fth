import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class RecieverService {
  constructor(
    private dbService: NgxIndexedDBService,
    private http: HttpClient,
  ) {}

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

  createRecieveTxn(data) {
    return this.dbService.add('recieveTxn', data)
  }
}
