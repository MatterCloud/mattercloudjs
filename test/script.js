'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

const options = {
    api_key: '',
    // api_url: 'http://localhost:3000',
    api_url: 'https://api.mattercloud.net',
};

describe('#getScriptHashUtxos', () => {
    it('should fail with invalid script', async () => {
        try {
            await index.instance(options).getScriptHashUtxos('address');
        } catch (ex) {
            // todo use 422 instead
            expect(ex).to.eql({ success: false, code: 404, error: '', message: '' });
        }
    });

    it('should succeed with getting utxos', async () => {
      var result = await index.instance(options).getScriptHashUtxos('03b508a9da0879dd55619e06f5bd656696f77ba879aaa99e0eb22cedd7dd4846', {
         afterHeight: 576167, sort: 'value:desc'
      });
      expect(result.length).to.eql(1);
      delete result[0].confirmations;

      expect(result).to.eql(
          [
            {
                "scripthash": "03b508a9da0879dd55619e06f5bd656696f77ba879aaa99e0eb22cedd7dd4846",
                "txid": "dc36f3baa9b7e96827928760c07a160579b0a531814e3a3900c1c4112c4a92e7",
                "vout": 0,
                "amount": 0.00004363,
                "satoshis": 4363,
                "value": 4363,
                "height": 625311,
                // "confirmations": 65,
                "outputIndex": 0
            }
          ]
      );
   });
});

describe('#getScriptHashHistory', () => {

    it('should succeed with getting history', async () => {
        var result = await index.instance(options).getScriptHashHistory('03b508a9da0879dd55619e06f5bd656696f77ba879aaa99e0eb22cedd7dd4846');
        expect(result).to.eql(
            {
                success: true,
                from: 0,
                to: 99999,
                results: [
                    {
                        "txid": "dc36f3baa9b7e96827928760c07a160579b0a531814e3a3900c1c4112c4a92e7",
                        "height": 625311
                    }
                ]
            }
        );
     });

});


