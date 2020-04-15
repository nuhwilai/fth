import { Injectable } from '@angular/core'
import * as _ from 'lodash'

import { openDB } from 'idb';

@Injectable({
    providedIn: 'root',
})
export class DataIndexedDbService {
    db: any

    async useDb(dbName: string, stores: string[]){
        this.db = await openDB(dbName, 1, {
            upgrade(db) {                
                _.each(stores, storeName => {
                    if(!db.objectStoreNames.contains(storeName)){
                        const store = db.createObjectStore(storeName, {
                            keyPath: 'id',
                            autoIncrement: true,
                        })
                        store.createIndex('flag', 'flag')
                    }
                })
            }
        })
    }

    async list(storeName) : Promise<any[]>{
        const results = []
        let cursor = await this.db.transaction(storeName).store.openCursor();
        while(cursor){
            results.push(cursor.value)
            cursor = await cursor.continue();
        }
        return results
    }

    async deleteRecord(storeName, key: number): Promise<void>{
        await this.db.delete(storeName, key)        
    }

    async clearStore(storeName): Promise<void>{
        return this.db.clear(storeName)
    }

    async addToStore(storeName, data): Promise<number>{
        return this.db.put(storeName, data)        
    }

    async countRecords(storeName): Promise<number>{        
        return this.db.count(storeName)
    }}