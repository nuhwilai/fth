# FTH; Food To Home Project
*created by Bonmek Team.*
Open source for web application that using for recording receiving product (food) from government or anyone.

-----------

# Setup Production
## server
1. Create RSA key on `/server/keys/prod` in folder included
    - `app.key` and `app.key.pub`

         ```sh
             # Don't add passphrase
             ssh-keygen -t rsa -b 4096 -m PEM -f app.key
             mv app.key.pub _app.key.pub
             openssl rsa -in app.key -pubout -outform PEM -out app.key.pub
             cat app.key
             cat app.key.pub
         ```
    - in `/server/conf`, config `config.js`
         ```js
             {   ...
                 secretKey: 'YOUR_SECRET_KEY',
             }
         ```
2. `yarn install`
## staff-web
1. In `/staff-web/src/environments`, config `environment.prod.ts` 
  ```ts
    {
        ...
        secretKey: 'YOUR_SECRET_KEY',
        serverPubKey: `YOUR_JWT_RSA256_PUBLIC_KEY`,
        googleApi: {
            key: 'YOUR_OAUTH_KEY',
        },
    }
  ```
2. `yarn install`

## villagers-web
1. `yarn install`

---------
# Run Production
## server
1. `yarn start:prod`
   
## staff-web
1. `yarn build --prod`
2. serve static folder on `./dist`

## villagers-web
1. `yarn build --prod`
2. serve static folder on `./dist`
