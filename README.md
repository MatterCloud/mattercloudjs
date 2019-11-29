# MatterCloud Javascript Library
> Bitcoin SV and Metanet API for Developers
> [MatterCloud.net](https://www.MatterCloud.net)

*Replaces [BitIndex SDK](https://github.com/bitindex/bitindex-sdk)*

![header](header.png)

[View Detailed Developer Documentation](https://developers.mattercloud.net)

---

## Quick Start

**Installation**
```sh
npm install mattercloudjs --save
```

**Include**
```javascript
// NodeJS
var options = {
    api_key: "your api key",
}
var mattercloud = require('mattercloudjs').instance(options);

```

##  Preview Examples

Easily query balances, utxos, and transactions on the Bitcoin SV Blockchain.

#### Get balance

```javascript
var result = await mattercloud.balance('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX');
```

GET https://api.mattercloud.net/api/v3/main/address/12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX/balance

Response:
```
{
  "address": "12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX",
  "confirmed": 30055,
  "unconfirmed": 0
}
```
#### Get utxos

```javascript
var result = await mattercloud.utxos('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX');
```

GET https://api.mattercloud.net/api/v3/main/address/12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX/utxo

Response:
```
[
  {
    "address": "12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX",
    "txid": "5e3014372338f079f005eedc85359e4d96b8440e7dbeb8c35c4182e0c19a1a12",
    "vout": 0,
    "amount": 0.00015399,
    "satoshis": 15399,
    "value": 15399,
    "height": 576168,
    "confirmations": 34730,
    "scriptPubKey": "76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac",
    "script": "76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac",
    "outputIndex": 0
  },
  {
    "address": "12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX",
    "txid": "96b3dc5941ce97046d4af6e7a69f4b38c48f05ef071c2a33f88807b89ab51da6",
    "vout": 1,
    "amount": 0.00014656,
    "satoshis": 14656,
    "value": 14656,
    "height": 576025,
    "confirmations": 34873,
    "scriptPubKey": "76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac",
    "script": "76a91410bdcba3041b5e5517a58f2e405293c14a7c70c188ac",
    "outputIndex": 1
  }
]
```
#### Broadcast Transaction
```javascript
var result = await mattercloud.sendRawTx('0100000001c8a78a...');
```

POST https://api.mattercloud.net/api/v3/main/tx/send

`Content-Type: application/json`

Request Body:
```
{
    "rawtx": "0942a836214..."
}
```
Response:
```
{
    "txid": "5e3014372338f079f005eedc85359e4d96b8440e7dbeb8c35c4182e0c19a1a12"
}
```

## Detailed Installation and Usage

**Installation**
```sh
npm install mattercloudjs --save
```

**Include**
```javascript
// Node
var options = {
    api_key: "your api key",
}
var mattercloud = require('mattercloudjs').instance(options);

```

```html
<!-- Browser -->
<script src="dist/mattercloud.min.js"></script>
<script language="javascript">
    // mattercloud.setApiKey('my key');
    var result = await mattercloud.utxos('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX');
    console.log('result', result);
</script>
```
See browser usage examples: https://github.com/MatterCloud/mattercloudjs/blob/master/dist/basic.html

## Prerequisites

- API key
- Get an API key at [MatterCloud.net](https://www.mattercloud.net)

### Promises vs. Callback

Both `await` and callback styles are supported for all methods.

Example:

```javascript

// Await style with promises
var result = await mattercloud.utxos('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX');

// Callback style
mattercloud.utxos('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', function(result) {
    // ...
});

```

## Detailed Documentation

[Developer Documentation](https://developers.mattercloud.net)


## Build and Test

```
npm install
npm run build
npm run test
```

-----------


 ## Any questions or ideas?

 We would love to hear from you!

 https://www.mattercloud.net

 https://twitter.com/MatterCloud


