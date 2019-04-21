# Node Api Boilerplate

Simple NodeJS REST Api with Facebook login.

## Getting Started
1. Create PostgreSQL database.
2. Create .env file and fill in env variables.

- Production:
    - npm start
- Development:
    - npm run db-migrate
    - npm run dev

## Database
- PostgreSQL
- Objection.js
- KnexJS

## Api Routes
  * _[Tokens](#tokens)_: [Login](#login), [Logout](#logout),
  * _[Me](#me)_: [Account](#me-account)
  * _[Error](#error)_: [Response](#error-response)

### Tokens

#### Login
  * URL: `/v1/tokens`
  * Method: `POST`
  * Params:
    * `type` _string (required)_: `facebook`
    * `token` _string (required)_: facebook token
  * New user will automatically be registered if no account.
  * Response:
    * HTTP: `200` _OK_
    * body:
      * `data` _object_
        * `accessToken` _string_

#### Log out
  * URL: `/v1/tokens`
  * Method: `DELETE`
  * Headers:
    * `authorization`: access token
  * Response:
    * HTTP: `204` _No Content_

### Me

#### Account
  * URL: `/v1/me`
  * Method: `GET`
  * Headers:
    * `authorization`: access token
  * Response:
    * HTTP: `200` _OK_
    * body:
      * `data` _object_
        * `id` _string_
        * `email` _string_
        * `firstName` _string_
        * `lastName` _string_

### Error

#### Error Response
  * Response:
    * HTTP: `4XX` or `5XX`
    * body:
      * `error` _object_
        * `code` _string_: error code
        * `message` _string_: error message
