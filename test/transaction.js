'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

const options = {
   api_key: '',
   // api_url: 'http://localhost:3000',
   api_url: 'https://api.mattercloud.net',
};

describe('#tx', () => {
    it('should fail with invalid tx', async () => {
        try {
            await index.instance(options).getTx('tx');
         } catch (ex) {
               expect(ex).to.eql({ success: false, code: 404, error: '', message: '' });
         }
    });

    it('should succeed single', async () => {
         var result = await index.instance(options).getTx('96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6');
         delete result.confirmations;
         expect(result).to.eql(
            {
                "txid":"96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6",
                "hash":"96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6",
                "size":301,
                "version":1,
                "locktime":0,
                "vin":[
                   {
                      "value":0.00015058,
                      "valueSat":15058,
                      "txid":"d834682a5d29646427e5627d38c10224036535fa7e3066ae2f7a163a96550e27",
                      "vout":1,
                      "scriptSig":{
                         "asm":"30440220132f6d484de9d34d314aec945865af5da95f35cf4c7cc271d40bc99f8d7f12e3022051fcb2ce4461d1c6e8a778f5e4dcb27c8461d18e0652f68a7a09a98e95df5cb7[ALL|FORKID] 044e2c1e2c055e7aefc291679882382c35894a6aa6dd95644f598e506c239f9d83b1d9671c1d9673e3c2b74f07e8032343f3adc21367bd4cffae92fe31efcd598a",
                         "hex":"4730440220132f6d484de9d34d314aec945865af5da95f35cf4c7cc271d40bc99f8d7f12e3022051fcb2ce4461d1c6e8a778f5e4dcb27c8461d18e0652f68a7a09a98e95df5cb74141044e2c1e2c055e7aefc291679882382c35894a6aa6dd95644f598e506c239f9d83b1d9671c1d9673e3c2b74f07e8032343f3adc21367bd4cffae92fe31efcd598a"
                      },
                      "addr":"12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX",
                      "address":"12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX",
                      "sequence":4294967295
                   }
                ],
                "vout":[
                   {
                      "value":0,
                      "valueSat":0,
                      "n": 0,
                      "scriptPubKey":{
                         "asm":"OP_RETURN 31394878696756345179427633744870515663554551797131707a5a56646f417574 1717859169 746578742f6d61726b646f776e 5554462d38 616e6f74686572",
                         "hex":"6a2231394878696756345179427633744870515663554551797131707a5a56646f41757404617364660d746578742f6d61726b646f776e055554462d3807616e6f74686572",
                         "type":"nulldata"
                      },
                   },
                   {
                      "value":0.00014656,
                      "valueSat":14656,
                      "n": 1,
                      "scriptPubKey":{
                         "asm":"OP_DUP OP_HASH160 10bdcba3041b5e5517a58f2e405293c14a7c70c1 OP_EQUALVERIFY OP_CHECKSIG",
                         "hex":"76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac",
                         "reqSigs":1,
                         "type":"pubkeyhash",
                         "addresses":[
                            "12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX"
                         ]
                      },
                   }
                ],
                "blockhash":"0000000000000000078f34d9cd3f48e4948aef4c79548ec777050e1c8953a85c",
                "blockheight": 576025,
                "time":1554007897,
                "blocktime":1554007897,
                "valueIn":0.00015058,
                "fees":0.00000402,
                "valueOut":0.00014656,
                "rawtx":"0100000001270e55963a167a2fae66307efa3565032402c1387d62e5276464295d2a6834d8010000008a4730440220132f6d484de9d34d314aec945865af5da95f35cf4c7cc271d40bc99f8d7f12e3022051fcb2ce4461d1c6e8a778f5e4dcb27c8461d18e0652f68a7a09a98e95df5cb74141044e2c1e2c055e7aefc291679882382c35894a6aa6dd95644f598e506c239f9d83b1d9671c1d9673e3c2b74f07e8032343f3adc21367bd4cffae92fe31efcd598affffffff020000000000000000456a2231394878696756345179427633744870515663554551797131707a5a56646f41757404617364660d746578742f6d61726b646f776e055554462d3807616e6f7468657240390000000000001976a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac00000000"
             }
        );
    });

    it('should succeed batch', async () => {
      var result = await index.instance(options).getTxBatch(['96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6', '6abdf1368e1d05bcad224c1f7063d8a8deb393dc7172e5de660e3c0265c58ee7']);
      delete result[0].confirmations;
      delete result[1].confirmations;
      expect(result).to.eql(
         [
            {
               "txid":"96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6",
               "hash":"96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6",
               "size":301,
               "version":1,
               "locktime":0,
               "vin":[
                  {
                     "value":0.00015058,
                     "valueSat":15058,
                     "txid":"d834682a5d29646427e5627d38c10224036535fa7e3066ae2f7a163a96550e27",
                     "vout":1,
                     "scriptSig":{
                        "asm":"30440220132f6d484de9d34d314aec945865af5da95f35cf4c7cc271d40bc99f8d7f12e3022051fcb2ce4461d1c6e8a778f5e4dcb27c8461d18e0652f68a7a09a98e95df5cb7[ALL|FORKID] 044e2c1e2c055e7aefc291679882382c35894a6aa6dd95644f598e506c239f9d83b1d9671c1d9673e3c2b74f07e8032343f3adc21367bd4cffae92fe31efcd598a",
                        "hex":"4730440220132f6d484de9d34d314aec945865af5da95f35cf4c7cc271d40bc99f8d7f12e3022051fcb2ce4461d1c6e8a778f5e4dcb27c8461d18e0652f68a7a09a98e95df5cb74141044e2c1e2c055e7aefc291679882382c35894a6aa6dd95644f598e506c239f9d83b1d9671c1d9673e3c2b74f07e8032343f3adc21367bd4cffae92fe31efcd598a"
                     },
                     "addr":"12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX",
                     "address":"12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX",
                     "sequence":4294967295
                  }
               ],
               "vout":[
                  {
                     "value":0,
                     "valueSat":0,
                     "n": 0,
                     "scriptPubKey":{
                        "asm":"OP_RETURN 31394878696756345179427633744870515663554551797131707a5a56646f417574 1717859169 746578742f6d61726b646f776e 5554462d38 616e6f74686572",
                        "hex":"6a2231394878696756345179427633744870515663554551797131707a5a56646f41757404617364660d746578742f6d61726b646f776e055554462d3807616e6f74686572",
                        "type":"nulldata"
                     },
                  },
                  {
                     "value":0.00014656,
                     "valueSat":14656,
                     "n": 1,
                     "scriptPubKey":{
                        "asm":"OP_DUP OP_HASH160 10bdcba3041b5e5517a58f2e405293c14a7c70c1 OP_EQUALVERIFY OP_CHECKSIG",
                        "hex":"76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac",
                        "reqSigs":1,
                        "type":"pubkeyhash",
                        "addresses":[
                           "12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX"
                        ]
                     },
                  }
               ],
               "blockhash":"0000000000000000078f34d9cd3f48e4948aef4c79548ec777050e1c8953a85c",
               "blockheight": 576025,
               "time":1554007897,
               "blocktime":1554007897,
               "valueIn":0.00015058,
               "fees":0.00000402,
               "valueOut":0.00014656,
               "rawtx":"0100000001270e55963a167a2fae66307efa3565032402c1387d62e5276464295d2a6834d8010000008a4730440220132f6d484de9d34d314aec945865af5da95f35cf4c7cc271d40bc99f8d7f12e3022051fcb2ce4461d1c6e8a778f5e4dcb27c8461d18e0652f68a7a09a98e95df5cb74141044e2c1e2c055e7aefc291679882382c35894a6aa6dd95644f598e506c239f9d83b1d9671c1d9673e3c2b74f07e8032343f3adc21367bd4cffae92fe31efcd598affffffff020000000000000000456a2231394878696756345179427633744870515663554551797131707a5a56646f41757404617364660d746578742f6d61726b646f776e055554462d3807616e6f7468657240390000000000001976a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac00000000"
            },
            {
               "txid": "6abdf1368e1d05bcad224c1f7063d8a8deb393dc7172e5de660e3c0265c58ee7",
               "hash": "6abdf1368e1d05bcad224c1f7063d8a8deb393dc7172e5de660e3c0265c58ee7",
               "size": 225,
               "version": 1,
               "locktime": 0,
               "vin": [
                 {
                   "value": 23.64025478,
                   "valueSat": 2364025478,
                   "txid": "c28f0ad5dd16673b73501d4a118e4595c786f8603ba3d8dd35c56f9ac3a080cc",
                   "vout": 1,
                   "scriptSig": {
                     "asm": "30440220441302ba6510db36a1765970eede1e79f3bec1bf86f5e1293fc0f28252287e9d02207597f187b9c5c15bd53577288d7779f7586d711a4eb709dafdb266976870b26b[ALL|FORKID] 038574d72d96d9d352ad2da7b115d9d4cfa7d7aa3cae8e0c29b399d03192baf7c3",
                     "hex": "4730440220441302ba6510db36a1765970eede1e79f3bec1bf86f5e1293fc0f28252287e9d02207597f187b9c5c15bd53577288d7779f7586d711a4eb709dafdb266976870b26b4121038574d72d96d9d352ad2da7b115d9d4cfa7d7aa3cae8e0c29b399d03192baf7c3"
                   },
                   "addr": "1BgUBaR2rjgp3db7dqBhverPoSKVipUmCN",
                   "address": "1BgUBaR2rjgp3db7dqBhverPoSKVipUmCN",
                   "sequence": 4294967295
                 }
               ],
               "vout": [
                 {
                   "value": 0.0196,
                   "valueSat": 1960000,
                   "n": 0,
                   "scriptPubKey": {
                     "asm": "OP_DUP OP_HASH160 3e257bcc6ff228fbdee52894f45bf32433a298b0 OP_EQUALVERIFY OP_CHECKSIG",
                     "hex": "76a9143e257bcc6ff228fbdee52894f45bf32433a298b088ac",
                     "reqSigs": 1,
                     "type": "pubkeyhash",
                     "addresses": [
                       "16fboJLLugG82GgQFNa2NMNKVaFjB6TKzG"
                     ]
                   },
                 },
                 {
                   "value": 23.62065251,
                   "valueSat": 2362065251,
                   "n": 1,
                   "scriptPubKey": {
                     "asm": "OP_DUP OP_HASH160 36a2a8d1aeee3e4f14857f725d41b0930d15ec3e OP_EQUALVERIFY OP_CHECKSIG",
                     "hex": "76a91436a2a8d1aeee3e4f14857f725d41b0930d15ec3e88ac",
                     "reqSigs": 1,
                     "type": "pubkeyhash",
                     "addresses": [
                       "15ytM8rvCgiNRAJKZfERZGHdXy8JZqJjUB"
                     ]
                   },
                 }
               ],
               "blockhash": "0000000000000000062e0ca7d73338e68284eb58175db871b125acf046501b0a",
               "blockheight": 611037,
               "time": 1575106827,
               "blocktime": 1575106827,
               "valueIn": 23.64025478,
               "fees": 0.00000227,
               "valueOut": 23.64025251,
               "rawtx": "0100000001cc80a0c39a6fc535ddd8a33b60f886c795458e114a1d50733b6716ddd50a8fc2010000006a4730440220441302ba6510db36a1765970eede1e79f3bec1bf86f5e1293fc0f28252287e9d02207597f187b9c5c15bd53577288d7779f7586d711a4eb709dafdb266976870b26b4121038574d72d96d9d352ad2da7b115d9d4cfa7d7aa3cae8e0c29b399d03192baf7c3ffffffff0240e81d00000000001976a9143e257bcc6ff228fbdee52894f45bf32433a298b088ac6341ca8c000000001976a91436a2a8d1aeee3e4f14857f725d41b0930d15ec3e88ac00000000"
             }
         ]
      );
   });

   it('should fail too large batch', async () => {
      try {
         await index.instance(options).getTxBatch([
            '96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6',
            '6abdf1368e1d05bcad224c1f7063d8a8deb393dc7172e5de660e3c0265c58ee7',
            '96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6',
            '6abdf1368e1d05bcad224c1f7063d8a8deb393dc7172e5de660e3c0265c58ee7',
            '96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6',
            '6abdf1368e1d05bcad224c1f7063d8a8deb393dc7172e5de660e3c0265c58ee7',
            '96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6',
            '6abdf1368e1d05bcad224c1f7063d8a8deb393dc7172e5de660e3c0265c58ee7',
            '96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6',
            '6abdf1368e1d05bcad224c1f7063d8a8deb393dc7172e5de660e3c0265c58ee7',
            '96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6',
            '6abdf1368e1d05bcad224c1f7063d8a8deb393dc7172e5de660e3c0265c58ee7',
            '96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6',
            '6abdf1368e1d05bcad224c1f7063d8a8deb393dc7172e5de660e3c0265c58ee7',
            '96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6',
            '6abdf1368e1d05bcad224c1f7063d8a8deb393dc7172e5de660e3c0265c58ee7',
            '96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6',
            '6abdf1368e1d05bcad224c1f7063d8a8deb393dc7172e5de660e3c0265c58ee7',
            '96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6',
            '6abdf1368e1d05bcad224c1f7063d8a8deb393dc7172e5de660e3c0265c58ee7',
            '96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6',
         ]);
      } catch (ex) {
         expect(ex).to.eql({ success: false, code: 422, error: 'too many requested' , message: 'too many requested' });
      }
   });
});

