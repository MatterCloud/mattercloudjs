"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_client_1 = require("./api-client");
const defaultOptions = {
    api_url: 'https://api.mattercloud.net',
    merchantapi_url: 'https://merchantapi.matterpool.io',
    network: 'main',
    version_path: 'api/v3',
    api_key: '' // Set to your API key
};
class MerchantApi {
    constructor(providedOptions) {
        this.options = Object.assign({}, defaultOptions, providedOptions);
    }
    submitTx(rawtx, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.mapi_submitTx(rawtx, callback);
    }
    getTxStatus(txid, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.mapi_statusTx(txid, callback);
    }
    getFeeQuote(callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.mapi_feeQuote(callback);
    }
    static instance(newOptions) {
        const mergedOptions = Object.assign({}, defaultOptions, newOptions);
        return new MerchantApi(mergedOptions);
    }
}
exports.MerchantApi = MerchantApi;
class MatterCloud {
    constructor(providedOptions) {
        this.options = Object.assign({}, defaultOptions, providedOptions);
    }
    setApiKey(key) {
        this.options = Object.assign({}, this.options, { api_key: key });
    }
    setOptions(newOptions) {
        this.options = Object.assign({}, this.options, newOptions);
    }
    getScriptHashUtxos(scripthash, args, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.scripthash_getUtxos(Object.assign({ scripthash }, args), callback);
    }
    getScriptHashHistory(scripthash, args, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.scripthash_getHistory(scripthash, Object.assign({}, args), callback);
    }
    getUtxos(addrs, args, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.addresses_getUtxos(Object.assign({ addrs }, args), callback);
    }
    getBalance(addr, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.address_getBalance(addr, callback);
    }
    getBalanceBatch(addrs, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.address_getBalanceBatch(addrs, callback);
    }
    getHistory(addr, args, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.address_getHistory(addr, args, callback);
    }
    getHistoryBatch(addrs, args, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.address_getHistoryBatch(addrs, args, callback);
    }
    getTx(txid, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.tx_getTransaction(txid, callback);
    }
    getTxRaw(txid, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.tx_getRawTransaction(txid, callback);
    }
    getTxBatch(txids, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.tx_getTransactionsBatch(txids, callback);
    }
    // @Deprecated
    // Use merchantapi mapi.submitTx
    sendRawTx(rawtx, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.sendRawTx(rawtx, callback);
    }
    // @Deprecated
    // Use merchantapi mapi.submitTx
    merchantTxBroadcast(rawtx, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.merchants_broadcastTx(rawtx, callback);
    }
    // @Deprecated
    // Use merchantapi mapi.getTxStatus
    merchantTxStatus(txid, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.merchants_statusTx(txid, callback);
    }
    get mapi() {
        return new MerchantApi(this.options);
    }
    static instance(newOptions) {
        const mergedOptions = Object.assign({}, defaultOptions, newOptions);
        return new MatterCloud(mergedOptions);
    }
}
exports.MatterCloud = MatterCloud;
function instance(newOptions) {
    const mergedOptions = Object.assign({}, defaultOptions, newOptions);
    return new MatterCloud(mergedOptions);
}
exports.instance = instance;
function mapi(newOptions) {
    const mergedOptions = Object.assign({}, defaultOptions, newOptions);
    return new MerchantApi(mergedOptions);
}
exports.mapi = mapi;
try {
    if (window) {
        window['mattercloud'] = new MatterCloud();
        window['merchantapi'] = new MerchantApi();
    }
}
catch (ex) {
    // Window is not defined, must be running in windowless env....
}
