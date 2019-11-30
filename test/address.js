'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

const options = {
    api_key: '',
    api_url: 'https://api.mattercloud.net',
};

describe('#getBalance', () => {
    it('should fail with invalid address', async () => {
        try {
            await index.instance(options).getBalance('address');
        } catch (ex) {
            expect(ex).to.eql({ code: 422, message: 'address invalid' });
        }
    });

    it('should fail with invalid address (callback)', (done) => {

        index.instance(options).getBalance('address', async (data, err) => {
            expect(err).to.eql({ code: 422, message: 'address invalid' });
            expect(data).to.eql(null);
            done();
        });

    });

    it('should succeed with getting getBalance', async () => {
        var result = await index.instance(options).getBalance('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX');
        expect(result).to.eql(
            {
              "address": "12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX",
               "confirmed":30055,
               "unconfirmed": 0,
            }
        );
    });

    it('should succeed with getting getBalance (callback)', (done) => {
         index.instance(options).getBalance('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', async (data, err) => {
            expect(data).to.eql(
                {
                "address": "12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX",
                "confirmed":30055,
                "unconfirmed": 0,
                }
            );
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('should succeed with getting getBalance batch', async () => {
        var result = await index.instance(options).getBalanceBatch(['12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', '1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD']);
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

describe('#getBalanceBatch', () => {

    it('should succeed with getting getBalance batch', async () => {
        var result = await index.instance(options).getBalanceBatch(['12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', '1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD']);
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

describe('#getUtxos', () => {
    it('should fail with invalid address', async () => {
        try {
            await index.instance(options).getUtxos('address');
        } catch (ex) {
            expect(ex).to.eql({ code: 422, message: 'address invalid' });
        }
    });

    it('should succeed with getting utxos with options', async () => {
      var result = await index.instance(options).getUtxos('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', {
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
      var result = await index.instance(options).getUtxos(['12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', '1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD'], {
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
        var result = await index.instance(options).getUtxos('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX');
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
        var result = await index.instance(options).getUtxos(['12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', '1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD']);
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

describe('#utxos batch', () => {
    it('should fail with invalid address', async () => {
        try {
            await index.instance(options).getUtxos(['asdfsf', '1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD']);
        } catch (ex) {
            expect(ex).to.eql({ code: 422, message: 'address invalid' });
        }

    });

    it('should succeed with getting utxos', async () => {
        var result = await index.instance(options).getUtxos(['12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', '1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD']);
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


describe('#getHistory', () => {

    it('should succeed with getting history', async () => {
        var result = await index.instance(options).getHistory('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX');
        expect(result).to.eql(
            {
                from: 0,
                to: 20,
                results: [
                    {
                        "height": 576168,
                        "txid": "5e3014372338f079f005eedc85359e4d96b8440e7dbeb8c35c4182e0c19a1a12"
                    },
                    {
                        "height": 576025,
                        "txid": "bdf6f49776faaa4790af3e41b8b474a7d0d47df540f8d71c3579dc0addd64c45"
                    },
                    {
                        "height": 576025,
                        "txid": "d834682a5d29646427e5627d38c10224036535fa7e3066ae2f7a163a96550e27"
                    },
                    {
                        "height": 576025,
                        "txid": "96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6"
                    }
                ]
            }
        );
     });

     it('should succeed with getting history with options', async () => {
        var args = {
            from: 1,
            to: 2
        };
        var result = await index.instance(options).getHistory('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', args);
        expect(result).to.eql(
            {
                from: 1,
                to: 2,
                results: [
                    {
                    "txid": "bdf6f49776faaa4790af3e41b8b474a7d0d47df540f8d71c3579dc0addd64c45",
                    "height": 576025
                    }
                ]
            }
        );
     });

     it('should fail with invalid range', async () => {
        var args = {
            from: 0,
            to: 21
        };
        try {
            await index.instance(options).getHistory('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', args);
        } catch (ex) {
            expect(ex).to.eql({ code: 422, message: 'params invalid' });
        }
     });

});
describe('#getHistoryBatch', () => {
     it('should succeed with getting history batch', async () => {
        var result = await index.instance(options).getHistoryBatch(['12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', '1XeMYaLJX6rhXcRe2XtGh6hgstgXwZ5SD']);
        expect(result).to.eql(
            {
                "from": 0,
                "to": 20,
                "results": [
                    {
                        "txid": "fcd2e37b0c9472fd81bc475e98193caa61581f3ded6c50e843d9c2e1ee5fdef6",
                        "height": 576171
                    },
                    {
                        "txid": "5e3014372338f079f005eedc85359e4d96b8440e7dbeb8c35c4182e0c19a1a12",
                        "height": 576168
                    },
                    {
                        "txid": "bdf6f49776faaa4790af3e41b8b474a7d0d47df540f8d71c3579dc0addd64c45",
                        "height": 576025
                    },
                    {
                        "txid": "d834682a5d29646427e5627d38c10224036535fa7e3066ae2f7a163a96550e27",
                        "height": 576025
                    },
                    {
                        "txid": "96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6",
                        "height": 576025
                    }
                ]
            }
        );
     });
});

