# APIs
- Using `http://SERVER_NAME/api/<api-name>`
- If those API is marked that "requires authorization". should setting headers `"Authorization": "Bearer <TOKEN>"` 
- In development, If you want disable authorization. You can set config `disableAuth` is `true`. in `/src/conf/config.js`

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
- [x] GET `/users`
   ```ts
        interface IUserQuerystring{
            offset?: number
            max?: number
            sort?: string // fieldName ex. roundDateTime
            order?: 'desc' | 'asc'
            // filter
            firstname_like?: string
            lastname_like?: string
            nationalId_like?: string
            phoneNumber_like?: string
        }
        interface IUserSuccessData {
            users: IUser[]
            totalCount: number
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
*Requires Authorization*
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
            receivedDate ?: string
            // embeded filter
            __withUserSchema ?: 'short' // 
            __withProductRoundSchema ?: 'full'
        }
        interface ICustomRecieveTxn extends IReceiveTxn {
            user ?: IUserSchemaShort // show when __withUserSchema = 'short'
        }
        interface IReceiveTxnSuccessData {
            receiveTxns: ICustomRecieveTxn[]
            totalCount: number
        }
    ```

# Product Round
*Requires Authorization*
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
            totalCount: number
        }
    ```
- [x] GET `/productRounds/:id`
     ```ts
        interface IListProductRoundSuccessData {
            productRound: IProductRound
        }
    ```

# Staff
- [x] POST `/login`
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
        localIds: string[]
    }
    ```
*Requires Authorization*
- **Model**
    ```ts
        interface IStaff {
            email: string
            role: 'ADMIN'
        }
    ```

- [x] POST `/staffs`
    ```ts
        interface ICreateStaffRequestBody extends IStaff {}
        interface ICreateStaffSuccessData {
            _id: string
        }
    ```
- [x] PUT `/staffs/:id`
    ```ts
        interface IUpdateStaffRequestBody extends IStaff {}
        interface IUpdateStaffSuccessData {
            _id: string
        }
    ```
- [x] DELETE `/staffs/:id`
    ```ts
        interface IDeleteStaffSuccessData {
            _id: string
        }
    ```
- [x] GET `/staffs`
     ```ts
        interface IStaffQuerystring{
            offset?: number
            max?: number
            sort?: string // fieldName ex. _id
            order?: 'desc' | 'asc'
        }
        interface IStaffSuccessData {
            staffs: IStaff[]
            totalCount: number
        }
    ```
- [x] GET `/staffs/:id`
     ```ts
        interface IListStaffSuccessData {
            staff: IStaff
        }
        
    ```
# QR
- [x] GET `/qrcode?text=&imageUrl=`




