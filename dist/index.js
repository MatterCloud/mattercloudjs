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
    utxos(addrs, args, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.addresses_getUtxos(Object.assign({ addrs }, args), callback);
    }
    balance(addr, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.address_getBalance(addr, callback);
    }
    balanceBatch(addrs, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.address_getBalanceBatch(addrs, callback);
    }
    tx(txid, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.tx_getTransaction(txid, callback);
    }
    sendRawTx(rawtx, callback) {
        const apiClient = new api_client_1.APIClient(this.options);
        return apiClient.sendRawTx(rawtx, callback);
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
