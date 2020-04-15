import { Injectable } from '@angular/core'
import * as _ from 'lodash'

import { openDB } from 'idb';

@Injectable({
    providedIn: 'root',
})
export class DataIndexedDbService {
    db: any

    async useDb(dbName: string, stores: [string]){
        this.db = await openDB(dbName, 1)
        _.each(stores, storeName => {
            if(!this.db.objectStoreNames.contains(storeName)){
                const store = this.db.createObjectSore(storeName, {
                    keyPath: 'id',
                    autoIncrement: true,
                })
                store.createIndex('data', 'data')
            }
        })
        
    }

    async list(storeName) : Promise<string[]>{
        return []
    }

    async deleteRecord(storeName, key): Promise<boolean>{
        return true
    }

    async clearStore(storeName): Promise<boolean>{
        return true
    }

    async addToStore(storeName, data): Promise<number>{
        return 0
    }

    async countRecords(storeName): Promise<number>{
        return 0
    }
}