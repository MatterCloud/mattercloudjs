# MatterCloud Javascript Library
> Bitcoin SV and Metanet API for Developers
> [MatterCloud.net](https://www.MatterCloud.net)

*Replaces [BitIndex SDK](https://github.com/bitindex/bitindex-sdk)*

![header](header.png)

[VIEW COMPLETE DEVELOPER DOCUMENTATION](https://developers.mattercloud.net)

---

## Quick Start

**Installation**
```sh
npm install mattercloudjs --save
```

**Include**

[Generate an API key](https://www.mattercloud.net/#get-api-key)

```javascript
// NodeJS
var options = {
    api_key: "your api key",
}
var mattercloud = require('mattercloudjs').instance(options);

```

##  Preview

Easily query balances, utxos, and transactions on the Bitcoin SV Blockchain.

#### Get balance

```javascript
var result = await mattercloud.getBalance('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX');
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
var result = await mattercloud.getUtxos('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX');
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
  }
]
```

[VIEW COMPLETE DEVELOPER DOCUMENTATION](https://developers.mattercloud.net)

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
<script src="dist/mattercloud.js"></script>
<script language="javascript">
    // mattercloud.setApiKey('my key');
    var result = await mattercloud.getUtxos('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX');
    console.log('result', result);
</script>
```
See browser usage examples: https://github.com/MatterCloud/mattercloudjs/blob/master/dist/basic.html

### Promises vs. Callback

Both `await` and callback styles are supported for all methods.

Example:

```javascript

// Await style with promises
var result = await mattercloud.getUtxos('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX');

// Callback style
mattercloud.getUtxos('12XXBHkRNrBEb7GCvAP4G8oUs5SoDREkVX', function(result) {
    // ...
});

```

## Detailed Documentation

[VIEW COMPLETE DEVELOPER DOCUMENTATION](https://developers.mattercloud.net)


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


