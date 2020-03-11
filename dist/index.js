"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_client_1 = require("./api-client");
const defaultOptions = {
    api_url: 'https://api.mattercloud.net',
    network: 'main',
    version_path: 'api/v3',
    api_key: '' // Set to your API key
};
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
    sendRawTx(rawtx, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.sendRawTx(rawtx, callback);
    }
    merchantTxBroadcast(rawtx, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.merchants_broadcastTx(rawtx, callback);
    }
    merchantTxStatus(rawtx, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.merchants_statusTx(rawtx, callback);
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
try {
    if (window) {
        window['mattercloud'] = new MatterCloud();
    }
}
catch (ex) {
    // Window is not defined, must be running in windowless env....
}
