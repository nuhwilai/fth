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
                        store.createIndex('data', 'data')
                        store.createIndex('flag', 'flag')
                    }
                })
            }
        })
    }

    async list(storeName) : Promise<string[]>{
        const results = []
        let cursor = await this.db.transaction(storeName).store.openCursor();
        while(cursor){
            results.push(cursor.value)
            cursor = await cursor.continue();
        }
        return results
    }

    async deleteRecord(storeName, key): Promise<boolean>{
        await this.db.delete(storeName, key)
        return true
    }

    async clearStore(storeName): Promise<boolean>{
        let cursor = await this.db.transaction(storeName).store.openCursor();
        while(cursor){
            await this.db.delete(storeName, cursor.key)
            cursor = await cursor.continue();
        }
        return true
    }

    async addToStore(storeName, data): Promise<number>{
        this.db.put(storeName, data)
        return 0
    }

    async countRecords(storeName): Promise<number>{        
        return await this.db.count(storeName)
    }}