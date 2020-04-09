import { Injectable } from '@angular/core'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root',
})
export class IndexDbService {
  private intervalInstance = null
  private intervalTime = 20000

  constructor(
    private dbService: NgxIndexedDBService,
    private http: HttpClient,
  ) {
    this.runIndexDbService()
  }

  runIndexDbService() {
    console.log('runIndexDbService')
    this.intervalInstance = setInterval(() => {
      this.addIndexDbToService()

      this.getServiceToIndexDb()
    }, this.intervalTime)
  }

  addIndexDbToService() {
    this.dbService.getAll('recieveTxn').then(
      (recieveTxn) => {
        if (_.isEmpty(recieveTxn)) {
          return
        }
        const newRecieveTxn = _.map(recieveTxn, (data) => _.omit(data, ['id']))
        this.http
          .post(environment.restEndpointUrl + '/receiveTxnSyncUp', {
            receiveTxns: newRecieveTxn,
          })
          .subscribe((data) => {
            if (data) {
              console.log('save success')
              this.dbService.clear('recieveTxn').then(
                () => {
                  console.log('clear :')
                },
                (error) => {
                  console.log(error)
                },
              )
            }
          })
      },
      (error) => {
        console.log(error)
      },
    )
  }

  getServiceToIndexDb() {
    // this.http.get('/producRounds').subscribe((data: any) => {})
  }
}
