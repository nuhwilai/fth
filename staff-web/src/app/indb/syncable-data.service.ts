import { Injectable } from '@angular/core'
import { DataIndexedDbService } from './data-indexed-db.service'
import * as _ from 'lodash'
import { ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SyncableDataService {
  db: any
  public settingLoaded: ReplaySubject<boolean> = new ReplaySubject()
  constructor(private dataIndexedDbService: DataIndexedDbService) {}

  async init(dbName: string, stores: string[]) {
    this.db = await this.dataIndexedDbService.useDb(dbName, stores)
    this.settingLoaded.next(true)
  }

  async upload(storeName: string, batchSize: number, handler: any) {
    let results = await this.dataIndexedDbService.list(storeName, batchSize)
    if (_.size(results) > 0) {
      const newResult = _.map(results, (result) => ({
        ...result,
        localId: result.id,
        id: undefined,
      }))
      let upload_result: IResponseSuccess = await handler(newResult)
      if (upload_result && upload_result.valid) {
        for (let key of upload_result.data.localIds) {
          await this.dataIndexedDbService.deleteRecord(storeName, key)
        }
      }
    }
  }

  async uploadWithGetAll(storeName: string, batchSize: number, handler: any) {
    const data: any = await this.dataIndexedDbService.list(storeName)
    const localIds = _.map(data, (d) => d.id)
    const result = await handler(data, localIds)
    if (result && result.valid) {
      const tx = this.db.transaction(storeName)
      _.each(result.data.localIds, (localId) => {
        this.dataIndexedDbService.deleteRecord(storeName, localId)
      })
      await tx.done
    }
  }

  async download(storeName: string, dataList: any[]) {
    this.dataIndexedDbService.clearStore(storeName)
    _.each(dataList, (data: any) => {
      this.dataIndexedDbService.addToStore(storeName, data)
    })
  }
}
