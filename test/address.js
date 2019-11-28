'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

const options = {
   api_key: '',
   api_url: 'https://api.mattercloud.net',
};

describe('#getBalance', () => {
    it('should fail with invalid address', async () => {
        var result = await index.instance(options).balance('address');
        expect(result).to.eql({
            code: 422,
            message: 'Request failed with status code 422'
        });
    });
    it('should succeed with getting balance', async () => {
        var result = await index.instance(options).balance('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX');
        expect(result).to.eql(
            {
              "address": "12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX",
               "confirmed":30055,
               "unconfirmed": 0,
            }
        );
    });

    it('should succeed with getting balance batch', async () => {
        var result = await index.instance(options).balanceBatch(['12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', '1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD']);
        expect(result).to.eql(
            [
                {
                    "address": "12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX",
                    "confirmed":30055,
                    "unconfirmed": 0,
                },
                {
                    "address": "1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD",
                    "confirmed":15411,
                    "unconfirmed": 0,
                }
            ]
        );
     });
});


describe('#getUtxos test', () => {
    it('should fail with invalid address', async () => {
        var result = await index.instance(options).utxos('address');
        expect(result).to.eql({
            code: 422,
            message: 'Request failed with status code 422'
        });
    });

    it('should succeed with getting utxos with options', async () => {
      var result = await index.instance(options).utxos('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', {
         afterHeight: 576167, sort: 'value:desc'
      });
      expect(result.length).to.eql(1);
      delete result[0].confirmations;

      expect(result).to.eql(
          [
              {
                  address: '12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX',
                  txid: '5e3014372338f079f005eedc85359e4d96b8440e7dbeb8c35c4182e0c19a1a12',
                  vout: 0,
                  outputIndex: 0,
                  amount: 0.00015399,
                  satoshis: 15399,
                  value: 15399,
                  height: 576168,
                  // confirmations: 1,
                  "script": "76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac",
                  scriptPubKey: '76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac'
              }
          ]
      );
      var result = await index.instance(options).utxos(['12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', '1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD'], {
         afterHeight: 576167, sort: 'value:desc'
      });
      delete result[0].confirmations;
      delete result[1].confirmations;
      expect(result).to.eql(
          [
              {
                  "address": "1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD",
                  "amount": 0.00015411,
                  "height": 576171,
                  "satoshis": 15411,
                  "script": "76a91405cba91bd4ec7645df9a5c162877815f758c9b3888ac",
                  "scriptPubKey": "76a91405cba91bd4ec7645df9a5c162877815f758c9b3888ac",
                  "txid": "fcd2e37b0c9472fd81bc475e98193caa61581f3ded6c50e843d9c2e1ee5fdef6",
                  "value": 15411,
                  "vout": 0,
                  outputIndex: 0,
              },
              {
                  address: '12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX',
                  txid: '5e3014372338f079f005eedc85359e4d96b8440e7dbeb8c35c4182e0c19a1a12',
                  vout: 0,
                  outputIndex: 0,
                  amount: 0.00015399,
                  satoshis: 15399,
                  value: 15399,
                  height: 576168,
                  // confirmations: 1,
                  scriptPubKey: '76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac',
                  script: '76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac'
              }
          ]
      );
   });

    it('should succeed with getting utxos', async () => {
        var result = await index.instance(options).utxos('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX');
        expect(result.length).to.eql(2);
        delete result[0].confirmations;
        delete result[1].confirmations;

        expect(result).to.eql(
            [
                {
                    address: '12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX',
                    txid: '5e3014372338f079f005eedc85359e4d96b8440e7dbeb8c35c4182e0c19a1a12',
                    vout: 0,
                    outputIndex: 0,
                    amount: 0.00015399,
                    satoshis: 15399,
                    value: 15399,
                    height: 576168,
                    // confirmations: 1,
                    "script": "76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac",
                    scriptPubKey: '76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac'
                },
                {
                    address: '12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX',
                    txid:
                    '96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6',
                    vout: 1,
                    outputIndex: 1,
                    amount: 0.00014656,
                    satoshis: 14656,
                    value: 14656,
                    height: 576025,
                    // confirmations: 144,
                    script: '76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac',
                    scriptPubKey: '76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac'
                }
            ]
        );
        var result = await index.instance(options).utxos(['12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', '1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD']);
        delete result[0].confirmations;
        delete result[1].confirmations;
        delete result[2].confirmations;
        expect(result).to.eql(
            [
                {
                    "address": "1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD",
                    "amount": 0.00015411,
                    "height": 576171,
                    "satoshis": 15411,
                    "script": "76a91405cba91bd4ec7645df9a5c162877815f758c9b3888ac",
                    "scriptPubKey": "76a91405cba91bd4ec7645df9a5c162877815f758c9b3888ac",
                    "txid": "fcd2e37b0c9472fd81bc475e98193caa61581f3ded6c50e843d9c2e1ee5fdef6",
                    "value": 15411,
                    "vout": 0,
                    outputIndex: 0,
                },
                {
                    address: '12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX',
                    txid: '5e3014372338f079f005eedc85359e4d96b8440e7dbeb8c35c4182e0c19a1a12',
                    vout: 0,
                    outputIndex: 0,
                    amount: 0.00015399,
                    satoshis: 15399,
                    value: 15399,
                    height: 576168,
                    // confirmations: 1,
                    scriptPubKey: '76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac',
                    script: '76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac'
                },
                {
                    address: '12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX',
                    txid:
                    '96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6',
                    vout: 1,
                    outputIndex: 1,
                    amount: 0.00014656,
                    satoshis: 14656,
                    value: 14656,
                    height: 576025,
                    // confirmations: 144,
                    scriptPubKey: '76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac',
                    script: '76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac'
                }
            ]
        );
    });
});

describe('#getUtxos batch', () => {
    it('should fail with invalid address', async () => {
        var result = await index.instance(options).utxos(['asdfsf', '1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD']);
        expect(result).to.eql({
            code: 422,
            message: 'Request failed with status code 422'
        });
    });

    it('should succeed with getting utxos', async () => {
        var result = await index.instance(options).utxos(['12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', '1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD']);
        expect(result.length).to.eql(3);
        delete result[0].confirmations;
        delete result[1].confirmations;
        delete result[2].confirmations;

        expect(result).to.eql(
            [
                {
                    "address": "1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD",
                    "amount": 0.00015411,
                    "height": 576171,
                    "satoshis": 15411,
                    "script": "76a91405cba91bd4ec7645df9a5c162877815f758c9b3888ac",
                    "scriptPubKey": "76a91405cba91bd4ec7645df9a5c162877815f758c9b3888ac",
                    "txid": "fcd2e37b0c9472fd81bc475e98193caa61581f3ded6c50e843d9c2e1ee5fdef6",
                    "value": 15411,
                    "vout": 0,
                    outputIndex: 0,
                },
                {
                    address: '12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX',
                    txid: '5e3014372338f079f005eedc85359e4d96b8440e7dbeb8c35c4182e0c19a1a12',
                    vout: 0,
                    outputIndex: 0,
                    amount: 0.00015399,
                    satoshis: 15399,
                    value: 15399,
                    height: 576168,
                    // confirmations: 1,
                    scriptPubKey: '76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac',
                    script: '76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac'
                },
                {
                    address: '12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX',
                    txid:
                    '96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6',
                    vout: 1,
                    outputIndex: 1,
                    amount: 0.00014656,
                    satoshis: 14656,
                    value: 14656,
                    height: 576025,
                    // confirmations: 144,
                    scriptPubKey: '76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac',
                    script: '76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac'
                }
            ]
        );
    });
});
