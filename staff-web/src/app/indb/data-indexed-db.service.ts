import { Injectable } from '@angular/core'
import * as _ from 'lodash'

import { openDB } from 'idb'

@Injectable({
  providedIn: 'root',
})
export class DataIndexedDbService {
  db: any

  async useDb(dbName: string, stores: string[]) {
    this.db = await openDB(dbName, 1, {
      upgrade(db) {
        _.each(stores, (storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, {
              keyPath: 'id',
              autoIncrement: true,
            })
            store.createIndex('flag', 'flag')
          }
        })
      },
    })

    return this.db
  }

  async list(storeName: string, limit = 1000): Promise<any[]> {
    const results = []
    let count = 0
    let cursor = await this.db.transaction(storeName).store.openCursor()
    while (cursor) {
      results.push(cursor.value)      
      count++
      if(count > limit)
        break
      cursor = await cursor.continue()            
    }
    return results
  }

  async deleteRecord(storeName: string, key: number): Promise<void> {
    await this.db.delete(storeName, key)
  }

  async clearStore(storeName: string): Promise<void> {
    return this.db.clear(storeName)
  }

  async addToStore(storeName: string, data): Promise<number> {
    return this.db.put(storeName, data)
  }

  async countRecords(storeName: string): Promise<number> {
    return this.db.count(storeName)
  }

}
