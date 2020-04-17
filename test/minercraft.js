'use strict';
var expect = require('chai').expect;
var Minercraft = require('minercraft');

describe('minercraft', () => {
   it('should query with minercraft getFeeQuote', async () => {
      const miner = new Minercraft({
         "url": "https://merchantapi.matterpool.io"
      })

      let rate = await miner.fee.rate()
      expect(rate).to.eql({ standard: { mine: 0.5, relay: 0.25 },
         data: { mine: 0.5, relay: 0.25 } });
   });

   it('should query fees and estimate tx fee cost', async () => {
      const miner = new Minercraft({
         "url": "https://merchantapi.matterpool.io"
      })
      let rate = await miner.fee.rate()
      expect(rate).to.eql({ standard: { mine: 0.5, relay: 0.25 },
         data: { mine: 0.5, relay: 0.25 } });

      let fee = miner.fee.get({
         rate: rate,
         tx: "0100000001648ed7d1c1a27ec923445c8d404e227145218c4ce01cf958a898c5a048e8f264020000006a47304402207dc1953455be091c8df18e7f7e1424bc4efdced3e400642f8316e3ef298c3f30022062d833b3f1b94593ec7c088b930e2987475c7d99bf19f5714b12a9facff100df41210273f105be3e7ca116e96c7c40f17267ae05ede7160eb099aa2146a88b6328f4ecffffffff030000000000000000fdc901006a223144535869386876786e36506434546176686d544b7855374255715337636e7868770c57544458565633505a4b474414e5ae89e5bebd2fe585ade5ae892fe99c8de982b119323032302d30342d30365430363a30303a30302b30383a30304c697b22617169223a223538222c22706d3235223a223332222c22706d3130223a223636222c22736f32223a2235222c226e6f32223a223235222c22636f223a22302e373530222c226f33223a223635222c22706f6c223a22504d3130222c22717561223a22e889af227d4cfb78da75d1c16a02311006e077c959964cb29944dfa1d07bf1209e0a6b57b137114aaf2d2d5e446d7b29d59e3c492f22f834d9ea5b3859e826bba4b73fc34cf898b999b0dee89675184ad662c3815094a5293370ca1a298f73415151ba2b9370cdfd9c124f34c55c563fe419c5eb2b9aa5b1fb1e3d7edf66c5cf93fdfa2ed6072a66ae2621d15203775d99fb070013c50da7cab45599c09b04062688999437993f53d91933ade6a7f5d16e37e7e5676842307553aa1b2685c19e02137a93a94c92c74c69dc54bc7f9c173bfbf21882745b379784a60e0a0f071ea4fce1a45f521a399cfae770f6f0605f67f6795f0381688010dd1da7dd0b690c97db22020000000000001976a914666675d887a7ae09835af934096d9fcbbb70eed288ac61290000000000001976a9149e7520bc258934a3d58704ab98ed0200e2c1bb9688ac00000000"
      })
      // todo why does the fee return NAN ?
   });

   it('should query tx status', async () => {
      const miner = new Minercraft({
         "url": "https://merchantapi.matterpool.io"
      })
      let status = await miner.tx.status("e4763d71925c2ac11a4de0b971164b099dbdb67221f03756fc79708d53b8800e")
      delete status.timestamp;
      delete status.confirmations;
      expect(status).to.eql({
         apiVersion: '0.1.0',
         returnResult: 'success',
         resultDescription: '',
         blockHash: '000000000000000000983dee680071d63939f4690a8a797c022eddadc88f925e',
         blockHeight: 630712,
         minerId: '0211ccfc29e3058b770f3cf3eb34b0b2fd2293057a994d4d275121be4151cdf087',
         txSecondMempoolExpiry: 0
       });
   });
});