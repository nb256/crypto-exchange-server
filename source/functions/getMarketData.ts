const axios = require('axios').default;

const generateApiUrl = (base: string, quote: string) => `https://ftx.com/api/markets/${base}/${quote}/orderbook?depth=100`
// Make a request for a user with a given ID
export default (base: string, quote: string) => axios.get(generateApiUrl(base, quote))
    .then(function (response: any) {
        // handle success
        return response;
    })
    .catch(function (error: any) {
        // handle error
        return error;
    })