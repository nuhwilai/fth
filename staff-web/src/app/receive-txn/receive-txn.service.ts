import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { stringify } from 'qs'

@Injectable({
  providedIn: 'root',
})
export class ReceiveTxnService {
  constructor(private http: HttpClient) {}

  listReceiveTxns(params: any) {
    return this.http.get(`${environment.apiEndpointUrl}/receiveTxns`, {
      params: new HttpParams({
        fromString: stringify(params, { allowDots: true }),
      }),
    })
  }
}
