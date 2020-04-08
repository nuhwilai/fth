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

- [ ] POST `/user`
   ```ts
        interface ICreateUserSuccessData {
            _id: string
            qrcodeToken: string
        }
    ```
- [ ] PUT `/user`
    ```ts
        interface ICreateUserSuccessData {
            _id: string
            qrcodeToken: string
        }
    ```
- [ ] POST `/requestQrToken`
   ```ts
        interface IRequestQrTokenBody {
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
    amount: number
    staffId: string
    productId: string
}
```
~~- POST `/receiveTxns`~~  
    - use `/receiveTxnSyncUp` instead
 

# Product Round
```ts
interface IProductRound {
    _id: string
   roundDateTime: Date
   productName: string
}
```
- [ ] POST `/productRounds`
    ```ts
        interface ICreateProductRoundSuccessData {
            _id: string
        }
    ```
- [ ] PUT `/productRounds`
    ```ts
        interface IUpdateProductRoundSuccessData {
            _id: string
        }
    ```
- [ ] DELETE `/productRounds`
    ```ts
        interface IDeleteProductRoundSuccessData {
            _id: string
        }
    ```
- [ ] GET `/productRounds`
     ```ts
        interface IProductRoundSuccessData {
            productRounds: IProductRound[]
        }
    ```
- [ ] GET `/productRounds/:id`
     ```ts
        interface IListProductRoundSuccessData {
            productRound: IProductRound
        }
    ```

# Staff
- [ ] POST `/login`
   ```ts
    interface ILoginSuccessData{
        token: string
    }
    ```
  
- [ ] POST `/receiveTxnSyncUp`
    ```ts
    interface IReceiveTxnSyncUpBody{
        receiveTxns: IReceiveTxn[]
    }
    interface IReceiveTxnSyncUpSuccessData{
        _ids: string[]
    }
    ```

# QR
- [ ] GET `/qrcode?text=&imageUrl=`




