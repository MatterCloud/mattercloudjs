'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

const options = {
   api_key: '',
   // api_url: 'http://localhost:3000',
   api_url: 'https://api.mattercloud.net',
};

describe('#sendRawTx', () => {
   it('should fail to send', async () => {
      try {
         await index.instance(options).merchantTxBroadcast('0100000001c8a78a47a63cc8378ee1abb29b00fee57f54700008907b2cc212fd1077f46229010000006a47304402207ca8de8bbc656f7df9f99790b61799e7745d12d354a1f346a20fbc32cc76e045022005e5536c5c8997670566d693f725072cec9db8d24aa048caad1108e0400bfcd2412103b1fa158185120c1266ff328964446cdb5816a37b2668411e847b4d2395a6a265ffffffff02273c0000000000001976a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac43c40e00000000001976a914256b0efdfc907d12125c4fbb1754b38e7c8b1a1788ac00000000');
      } catch (ex) {
         expect(ex).to.eql({ success: false, code: 422, error: 'TXN_ALREADY_KNOWN', message: 'TXN_ALREADY_KNOWN' });
      }
   });
});

describe('#merchantTxBroadcast', () => {
   it('should succeed to send (existing tx)', async () => {
      const result = await index.instance(options).merchantTxBroadcast('0100000001c8a78a47a63cc8378ee1abb29b00fee57f54700008907b2cc212fd1077f46229010000006a47304402207ca8de8bbc656f7df9f99790b61799e7745d12d354a1f346a20fbc32cc76e045022005e5536c5c8997670566d693f725072cec9db8d24aa048caad1108e0400bfcd2412103b1fa158185120c1266ff328964446cdb5816a37b2668411e847b4d2395a6a265ffffffff02273c0000000000001976a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac43c40e00000000001976a914256b0efdfc907d12125c4fbb1754b38e7c8b1a1788ac00000000');
      expect(result.success).to.eql(true);
   });
});

describe('#merchantTxBroadcast', () => {
   it('should fail to send', async () => {
      try {
         const result = await index.instance(options).merchantTxBroadcast('0100000001c02e9849efc62331af4e0a7be4a4be4b3d315f637b3fde735e2ab67ee464d1ac010000006a4730440220099bb922ab524368c370d5f882a576d052097bf1f94cebe36edd387b2e0ea2cf02206522a2e32f82ff7e975a70f39e73013b41642208e3f6ab9c9955a446e4b947bb412102119ebe4639964590bcf358539740f8ea4b6546b8416cbbbf6de12fafd3a13d1affffffff020000000000000000176a026d0212706f737420746f206d656d6f2e6361736821ba730200000000001976a914161e9c31fbec37d9ecb297bf4b814c6e189dbe5288ac00000000');
      } catch (ex) {
         expect(ex).to.eql({ success: false, code: 422, error: 'DUST', message: 'DUST' });
      }
   });
});

describe('#merchantTxStatus', () => {
   it('should fail to send invalid address', async () => {
      try {
         await index.instance(options).merchantTxStatus('i34222invalid');
      } catch (ex) {
         expect(ex).to.eql({ success: false, code: 422, error: 'txid invalid', message: 'txid invalid' });
      }
   });

   it('should not found transaction', async () => {
      try {
         await index.instance(options).merchantTxStatus('149a217f3a9eac4611688e44f3d5508cf8c711e6b583bb08bcff54dcda124ee5');
      } catch (ex) {
         expect(ex).to.eql({ success: false, code: 404, error: 'TX_NOT_FOUND', message: 'TX_NOT_FOUND' });
      }
   });

   it('Retrieve status success', async () => {

      const result = await index.instance(options).merchantTxStatus('349a217f3a9eac4611688e44f3d5508cf8c711e6b583bb08bcff54dcda124ee5');
      delete result.result.confirmations;
      expect(result).to.eql({
         success: true,
         result: {
            "txid": "349a217f3a9eac4611688e44f3d5508cf8c711e6b583bb08bcff54dcda124ee5",
            "blockhash": "0000000000000000012c4624da90017fc6b636b926675be0c6f46e178ddc92b7",
            "blocktime": 1582991571,
            "time": 1582991571,
            "fees": 0.00000615,
            "size": 515,
            "valueIn": 0.003,
            "valueOut": 0.00299385,
         }
      });
   });
});
