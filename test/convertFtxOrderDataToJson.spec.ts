import convertFtxOrderDataToJson from "../source/functions/convertFtxOrderDataToJson";
import { expect } from 'chai';

describe("convertFtxOrderDataToJson function tests", function () {
    it("should convert [46898.0, 0.0801] to {price:46898.0, amount:0.0801}", function () {
        const result = convertFtxOrderDataToJson([46898.0, 0.0801]);
        expect(result.price).to.equal(46898.0)
        expect(result.amount).to.equal(0.0801)
    });
});
