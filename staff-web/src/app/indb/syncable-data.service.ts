import { Injectable } from '@angular/core'
import { DataIndexedDbService } from './data-indexed-db.service'
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root',
})
export class SyncableDataService {
  db: any
  constructor(private dataIndexedDbService: DataIndexedDbService) {}

  async init(dbName: string, stores: string[]) {
    this.db = await this.dataIndexedDbService.useDb(dbName, stores)
  }

  async upload(storeName: string, batchSize: number, handler: any) {
    let cursor = await this.db.transaction(storeName).store.openCursor()

    // const result = [{_id: , localId:}]

    while (cursor) {
      const cur = cursor
      const result = (await handler({ ...cur.value, localId: cur.key })) || null
      try {
        cursor = await cur.continue()
      } catch (e) {
        cursor = null
      }
      if (result && result.valid) {
        // this.dataIndexedDbService.deleteRecord(storeName, cur.key)
      }
    }

    // getAll

    // save to server  => ids

    // runTxn(idx)

    // const tx = this.db.transaction(storeName)

    // for await (const cursor of tx.store) {
    //   const cur = cursor
    //   const result = await handler(cur.value)
    //   console.log('cur :', cur);
    //   cursor.continue()
    //   if (result) {
    //     // this.dataIndexedDbService.deleteRecord(storeName, cur.key)
    //   }
    // }
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
