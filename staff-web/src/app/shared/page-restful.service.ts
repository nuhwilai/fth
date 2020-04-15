import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { stringify } from 'qs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PagedRestfulService {
  constructor(private http: HttpClient) {}

  loadPagedRestful(resource: string, id: string | number, params?: any) {
    return this.http.get(environment.restEndpointUrl + `/${resource}/` + id, {
      params: new HttpParams({
        fromString: stringify({
          ...params,
        }),
      }),
    })
  }

  listPagedRestful(
    resource: string,
    params: any,
    offset?: number,
    max?: number,
    sort?: string,
    order?: 'asc' | 'desc',
  ) {
    return this.http.get(environment.restEndpointUrl + `/${resource}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }),
      params: new HttpParams({
        fromString: stringify({
          offset: offset,
          max: max,
          sort: sort,
          order: order,
          ...params,
        }),
      }),
    })
  }

  createPagedRestful(resource: string, data: any) {
    return this.http.post(environment.restEndpointUrl + `/${resource}`, data)
  }

  updatePagedRestful(resource: string, id: string | number, data: object) {
    return this.http.put(
      environment.restEndpointUrl + `/${resource}/` + id,
      data,
    )
  }

  deletePagedRestful(resource: string, id: string | number) {
    return this.http.delete(environment.restEndpointUrl + `/${resource}/` + id)
  }
}
