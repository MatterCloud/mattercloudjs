"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const defaultOptions = {
    api_url: 'https://api.mattercloud.net',
    network: 'main',
    version_path: 'api/v3',
};
/**
 * API Client
 */
class APIClient {
    constructor(options) {
        this.options = defaultOptions;
        this.options = Object.assign({}, this.options, options);
        this.fullUrl = `${this.options.api_url}/${this.options.version_path}/${this.options.network}`;
    }
    // Populate api reqest header if it's set
    getHeaders() {
        if (this.options.api_key && this.options.api_key !== '') {
            return {
                api_key: this.options.api_key
            };
        }
        return {};
    }
    /**
     * Resolve a promise and/or invoke a callback
     * @param resolve Resolve function to call when done
     * @param data Data to pass forward
     * @param callback Invoke an optional callback first
     */
    resolveOrCallback(resolve, data, callback) {
        if (callback) {
            callback(data);
            return undefined;
        }
        if (resolve) {
            return resolve(data);
        }
        return new Promise((r, reject) => {
            return r(data);
        });
    }
    /**
    * Resolve a promise and/or invoke a callback
    * @param reject Reject function to call when done
    * @param data Data to pass forward
    * @param callback Invoke an optional callback first
    */
    rejectOrCallback(reject, err, callback) {
        if (callback) {
            callback(null, err);
            return;
        }
        if (reject) {
            return reject(err);
        }
        return new Promise((resolve, r) => {
            r(err);
        });
    }
    formatErrorResponse(r) {
        // let getMessage = r && r.response && r.response.data ? r.response.data : r.toString();
        let getMessage = r && r.response && r.response.data ? r.response.data : r;
        return {
            success: getMessage.success ? getMessage.success : false,
            code: getMessage.code ? getMessage.code : -1,
            message: getMessage.message ? getMessage.message : '',
            error: getMessage.error ? getMessage.error : '',
        };
    }
    tx_getTransaction(txid, callback) {
        return new Promise((resolve, reject) => {
            if (!txid || /^(\s*)$/.test(txid)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'txid required'
                }), callback);
            }
            axios_1.default.get(this.fullUrl + `/tx/${txid}`, {
                headers: this.getHeaders()
            }).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback);
            });
        });
    }
    tx_getTransactionsBatch(txids, callback) {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(txids)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'txid required'
                }), callback);
            }
            let payload = {
                txids: Array.isArray(txids) ? txids.join(',') : txids
            };
            axios_1.default.post(this.fullUrl + `/tx`, payload, {
                headers: this.getHeaders()
            }).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback);
            });
        });
    }
    address_getBalance(addr, callback) {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(addr)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'address required'
                }), callback);
            }
            axios_1.default.get(this.fullUrl + `/address/${addr}/balance`, {
                headers: this.getHeaders()
            }).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback);
            });
        });
    }
    address_getHistory(addr, options, callback) {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(addr)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'address required'
                }), callback);
            }
            let args = '';
            if (options && options.from) {
                args += `from=${options.from}&`;
            }
            if (options && options.to) {
                args += `to=${options.to}&`;
            }
            const url = this.fullUrl + `/address/${addr}/history?${args}`;
            axios_1.default.get(url, {
                headers: this.getHeaders()
            }).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback);
            });
        });
    }
    address_getBalanceBatch(addrs, callback) {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(addrs)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'address required'
                }), callback);
            }
            let addrsNew = [];
            if (!Array.isArray(addrs)) {
                addrsNew.push(addrs);
            }
            else {
                addrsNew = addrs;
            }
            let payload = {
                addrs: Array.isArray(addrsNew) ? addrsNew.join(',') : addrsNew
            };
            axios_1.default.post(this.fullUrl + `/address/balance`, payload, {
                headers: this.getHeaders()
            }).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback);
            });
        });
    }
    address_getHistoryBatch(addrs, options, callback) {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(addrs)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'address required'
                }), callback);
            }
            let addrsNew = [];
            if (!Array.isArray(addrs)) {
                addrsNew.push(addrs);
            }
            else {
                addrsNew = addrs;
            }
            let payload = {
                addrs: Array.isArray(addrsNew) ? addrsNew.join(',') : addrsNew
            };
            if (options && options.from) {
                payload.from = options.from;
            }
            if (options && options.from) {
                payload.to = options.to;
            }
            axios_1.default.post(this.fullUrl + `/address/history`, payload, {
                headers: this.getHeaders()
            }).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback);
            });
        });
    }
    isStringOrNonEmptyArray(item) {
        if (!item) {
            return false;
        }
        if (Array.isArray(item) && !item.length) {
            return false;
        }
        return true;
    }
    scripthash_getHistory(scripthash, options, callback) {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(scripthash)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'scripthash required'
                }), callback);
            }
            let args = '';
            if (options && options.from) {
                args += `from=${options.from}&`;
            }
            if (options && options.to) {
                args += `to=${options.to}&`;
            }
            const url = this.fullUrl + `/scripts/${scripthash}/history?${args}`;
            axios_1.default.get(url, {
                headers: this.getHeaders()
            }).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback);
            });
        });
    }
    scripthash_getUtxos(args, callback) {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(args.scripthash)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'scripthash required',
                    error: 'scripthash required'
                }), callback);
            }
            let scripthashes = [];
            if (!Array.isArray(args.scripthash)) {
                scripthashes.push(args.scripthash);
            }
            else {
                scripthashes = args.scripthash;
            }
            let payload = {
                scripthash: Array.isArray(scripthashes) ? scripthashes.join(',') : scripthashes
            };
            axios_1.default.post(this.fullUrl + `/scripts/utxo`, payload, {
                headers: this.getHeaders()
            }).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback);
            });
        });
    }
    addresses_getUtxos(args, callback) {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(args.addrs)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'address required'
                }), callback);
            }
            let addrs = [];
            if (!Array.isArray(args.addrs)) {
                addrs.push(args.addrs);
            }
            else {
                addrs = args.addrs;
            }
            let payload = {
                addrs: Array.isArray(addrs) ? addrs.join(',') : addrs
            };
            if (args.offset) {
                payload.offset = args.offset;
            }
            if (args.limit) {
                payload.limit = args.limit;
            }
            if (args.afterHeight) {
                payload.afterHeight = args.afterHeight;
            }
            if (args.sort) {
                payload.sort = args.sort;
            }
            axios_1.default.post(this.fullUrl + `/address/utxo`, payload, {
                headers: this.getHeaders()
            }).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback);
            });
        });
    }
    // Deprecated, use broadcastTx
    sendRawTx(rawtx, callback) {
        return new Promise((resolve, reject) => {
            axios_1.default.post(this.fullUrl + `/tx/send`, { rawtx }, {
                headers: this.getHeaders()
            }).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback);
            });
        });
    }
    merchants_broadcastTx(rawtx, callback) {
        return new Promise((resolve, reject) => {
            axios_1.default.post(this.fullUrl + `/merchants/tx/broadcast`, { rawtx }, {
                headers: this.getHeaders()
            }).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback);
            });
        });
    }
    merchants_statusTx(txid, callback) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(this.fullUrl + `/merchants/tx/status/${txid}`, {
                headers: this.getHeaders()
            }).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback);
            });
        });
    }
}
exports.APIClient = APIClient;
