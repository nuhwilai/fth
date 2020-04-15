import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class GoogleSpreadSheetService {
  constructor(private http: HttpClient) {}

  getSpreadSheet(id) {
    return this.http.get(
      `https://docs.google.com/spreadsheets/d/e/${id}/pub?gid=0&single=true&output=csv`,
      { responseType: 'text' },
    )
  }
}
