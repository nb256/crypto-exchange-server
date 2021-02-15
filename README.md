# fastify-typescript-tests-boilerplate

A boilerplate crypto-exchange application with [Tests(Mocha, Chai)](https://dev-tester.com/dead-simple-api-tests-with-supertest-mocha-and-chai/), [Typescript](https://www.typescriptlang.org/), [Fastify](https://www.fastify.io/benchmarks/)

### Install and run in development mode

```
1) npm install
2) npm run dev
```

### Install and run in production mode

```
1) npm install
2) npm run start
```

### Run tests

```
1) npm test
```

Api listens on http://localhost:80

Example Request:

```json
{
  "action": "buy",
  "base_currency": "BTC",
  "quote_currency": "USD",
  "amount": 10
}
```

Example Responses:

```json
{
  "total": "481880.93919999985",
  "price": "48188.093919999985",
  "currency": "USD"
}
```

```json
{
  "error_message": "body.action should be equal to one of the allowed values"
}
```

```json
{
  "error_message": "Market is not available for BTCC/USD"
}
```

It matches your quote using https://docs.ftx.com/?javascript#get-orderbook api, further information about what order book is can be found at https://en.wikipedia.org/wiki/Order_book

## Authors

- **Naim Buru** - _Initial work_ - [nb256](https://github.com/nb256)

## License

This project is licensed under the GNU GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details
