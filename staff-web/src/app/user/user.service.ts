import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { stringify } from 'qs'
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  listUsers(params: any) {
    return this.http.get(`${environment.apiEndpointUrl}/users`, {
      params: new HttpParams({ fromString: stringify(params) }),
    })
  }
}
