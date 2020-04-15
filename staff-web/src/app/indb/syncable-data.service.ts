import { Injectable } from '@angular/core'
import { DataIndexedDbService } from './data-indexed-db.service'
import * as _ from 'lodash'

@Injectable({
    providedIn: 'root',
})
export class SyncableDataService {    
    db: any
    constructor(
        private dataIndexedDbService: DataIndexedDbService
    ){                
    }

    async init(dbName: string, stores: string[]){
        this.db = await this.dataIndexedDbService.useDb(dbName, stores)
    }

    async upload(storeName: string, batchSize: number, handler: any){
        let cursor = await this.db.transaction(storeName).store.openCursor();        
        while(cursor){
            let result = await handler(cursor.value)
            if(result){
                this.dataIndexedDbService.deleteRecord(storeName, result.key)
            }
            cursor = await cursor.continue();
        }
    }

    async download(storeName: string, dataList: any[]){
        this.dataIndexedDbService.clearStore(storeName)
        _.each(dataList, (data: any) => {
            this.dataIndexedDbService.addToStore(storeName, data)
        })
    }
}