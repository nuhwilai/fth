# FTH; Food To Home Project
*created by Bonmek Team.*
Open source for web application that using for recording receiving product (food) from government or anyone.

-----------

# Setup Production
## server
1. Create RSA key on `/server/keys/prod` in folder included
    - `app.key` and `app.key.pub`

         ```sh
             ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
             # Don't add passphrase
             openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
             cat jwtRS256.key
             cat jwtRS256.key.pub
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
