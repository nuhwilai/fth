# APIs
- using `http://SERVER_NAME/api/<api-name>`
# HTTP Response
```ts
    interface IResponseSuccess {
        valid: boolean // true
        data: any // see I<SomeThing>SuccessData
    }
```

```ts
    interface IResponseFail {
        valid: boolean // false
        reason: string 
    }
```
# User

```ts
    interface IUser {
        firstname: string
        lastname: string
        isUsePassport: boolean
        nationalId: string
        phoneNumber: string
        homeNumber: string
        homeMoo?: string
        homeMooban?: string
        homePostalCode: string
        homeSubDistrict: string
        homeDistrict: string
        homeProvince: string
        allergies: string[]
        diseases: string[]
        members: {
            isUsePassport: string
            firstname: string
            lastname: string
            nationalId: string
            allergies: string[]
            diseases: string[]
        }[]
        remark?: string
    }

    interface IUserSchemaShort {
        firstname: string
        lastname: string
        phoneNumber: string
        homeNumber: string
        homeMoo?: string
        homeMooban?: string
        homePostalCode: string
        homeSubDistrict: string
        homeDistrict: string
        homeProvince: string
    }
```

- [x] POST `/users`
   ```ts
        interface ICreateUserBody extends IUser {
        }

        interface ICreateUserSuccessData {
            _id: string
            qrcodeToken: string
        }
    ```
- [x] GET `/users/:nationalId`
    ```ts
        interface IUserQuerystring{
            _schema?: 'short'
        }
        interface IUserSuccessData {
            user: IUser | IUserSchemaShort
        }
    ```
- [x] PUT `/users/:nationalId`
    ```ts
        interface IUpdateUserSuccessData {
            _id: string
        }
    ```
- [x] POST `/requestQrToken`
   ```ts
        interface IRequestQrTokenBody {
            isUsePassport: boolean
            nationalId: string
            phoneNumber: string
        }

        interface IRequestQrTokenSuccessData {
            _id: string // userId
            qrcodeToken: string
        }
    ```  

# Receive Txn
```ts
interface IReceiveTxn {
    _id: string
    nationalId: string
    receivedDateTime: Date
    receivedDate: string // YYYY-MM-DD
    amount: number
    staffId: string
    productId: string
}
```
~~- POST `/receiveTxns`~~  
    - use `/receiveTxnSyncUp` instead
 
- [x] GET `/receiveTxns`
     ```ts
        interface IReceiveTxnQuerystring{
            offset?: number
            max?: number
            sort?: string // fieldName ex. roundDateTime
            order?: 'desc' | 'asc'
            // filter
            nationalId_like ?: string
            productId ?: string
            // embeded filter
            __withUserSchema ?: 'short' // 
        }
        interface ICustomRecieveTxn extends IReceiveTxn {
            user ?: IUserSchemaShort // show when __withUserSchema = 'short'
        }
        interface IReceiveTxnSuccessData {
            receiveTxns: ICustomRecieveTxn[]
        }
    ```

# Product Round
```ts
interface IProductRound {
    _id: string
   roundDateTime: Date
   roundDate: string // YYYY-MM-DD
   productName: string
}
```
- [x] POST `/productRounds`
    ```ts
        interface ICreateProductRoundSuccessData {
            _id: string
        }
    ```
- [x] PUT `/productRounds/:id`
    ```ts
        interface IUpdateProductRoundSuccessData {
            _id: string
        }
    ```
- [x] DELETE `/productRounds/:id`
    ```ts
        interface IDeleteProductRoundSuccessData {
            _id: string
        }
    ```
- [x] GET `/productRounds`
     ```ts
        interface IProductRoundQuerystring{
            offset?: number
            max?: number
            sort?: string // fieldName ex. roundDateTime
            order?: 'desc' | 'asc'
            // filter
            roundDateTime?: string // ISOString
            roundDateTime_gt?: string // ISOString
            productName?: string
            productName_like?: string
        }
        interface IProductRoundSuccessData {
            productRounds: IProductRound[]
        }
    ```
- [x] GET `/productRounds/:id`
     ```ts
        interface IListProductRoundSuccessData {
            productRound: IProductRound
        }
    ```

# Staff
- [ ] POST `/login`
   ```ts
    interface ILoginBody{
        oauthToken: string
    }
    interface ILoginSuccessData{
        token: string
    }
    ```
  
- [x] POST `/receiveTxnSyncUp`
    ```ts
    interface IReceiveTxnSyncUpBody{
        receiveTxns: IReceiveTxn[]
    }
    interface IReceiveTxnSyncUpSuccessData{
        _ids: string[]
    }
    ```

# QR
- [x] GET `/qrcode?text=&imageUrl=`




