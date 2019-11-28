"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const defaultOptions = {
    api_url: 'localhost:3000',
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
     * @param resolveOrReject Resolve or reject function to call when done
     * @param data Data to pass forward
     * @param callback Invoke an optional callback first
     */
    callbackAndResolve(resolveOrReject, data, callback) {
        if (callback) {
            callback(data);
        }
        if (resolveOrReject) {
            return resolveOrReject(data);
        }
    }
    tx_getTransaction(txid, callback) {
        return new Promise((resolve, reject) => {
            if (!txid || /^(\s*)$/.test(txid)) {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'txid required'
                }, callback);
            }
            axios_1.default.get(this.fullUrl + `/tx/${txid}`, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    blockheader(blockhash, callback) {
        return new Promise((resolve, reject) => {
            if (!blockhash || /^(\s*)$/.test(blockhash)) {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'blockhash required'
                }, callback);
            }
            axios_1.default.get(this.fullUrl + `/blockheader/${blockhash}`, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    block(blockhash, callback) {
        return new Promise((resolve, reject) => {
            if (!blockhash || /^(\s*)$/.test(blockhash)) {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'blockhash required'
                }, callback);
            }
            axios_1.default.get(this.fullUrl + `/block/${blockhash}`, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    getBlockHeaders(args, callback) {
        return new Promise((resolve, reject) => {
            let url = this.fullUrl + `/blockheaders`;
            if (args.fromBlockHash) {
                url += `&fromBlockHash=${args.fromBlockHash}`;
            }
            if (args.fromHeight) {
                url += `&fromHeight=${args.fromHeight}`;
            }
            if (args.order) {
                url += `&order=${args.order}`;
            }
            if (args.limit) {
                url += `&limit=${args.limit}`;
            }
            axios_1.default.get(url, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    rawblock(blockhash, callback) {
        return new Promise((resolve, reject) => {
            if (!blockhash || /^(\s*)$/.test(blockhash)) {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'blockhash required'
                }, callback);
            }
            axios_1.default.get(this.fullUrl + `/rawblock/${blockhash}`, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    blockhash(blockhash, callback) {
        return new Promise((resolve, reject) => {
            if (!blockhash || /^(\s*)$/.test(blockhash)) {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'blockhash required'
                }, callback);
            }
            axios_1.default.get(this.fullUrl + `/rawblock/${blockhash}`, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    blockindex(height, callback) {
        return new Promise((resolve, reject) => {
            if (!height || /^(\s*)$/.test(height)) {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'height required'
                }, callback);
            }
            axios_1.default.get(this.fullUrl + `/block-index/${height}`, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    status_getBestBlockHash(callback) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(this.options.api_url + `/api/status?q=getBestBlockHash`, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    status_getLastBlockHash(callback) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(this.options.api_url + `/api/status?q=getLastBlockHash`, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    status_getDifficulty(callback) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(this.options.api_url + `/api/status?q=getDifficulty`, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    status(callback) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(this.options.api_url + `/api/status`, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    address_getBalance(addr, callback) {
        if (!this.isStringOrNonEmptyArray(addr)) {
            return new Promise((resolve, reject) => {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'address required'
                }, callback);
            });
        }
        return new Promise((resolve, reject) => {
            axios_1.default.get(this.fullUrl + `/addrs/${addr}/balance`, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    address_getBalanceBatch(addrs, callback) {
        if (!this.isStringOrNonEmptyArray(addrs)) {
            return new Promise((resolve, reject) => {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'address required'
                }, callback);
            });
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
        return new Promise((resolve, reject) => {
            axios_1.default.post(this.fullUrl + `/addrs/balance`, payload, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
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
    addresses_getUtxos(args, callback) {
        if (!this.isStringOrNonEmptyArray(args.addrs)) {
            return new Promise((resolve, reject) => {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'address required'
                }, callback);
            });
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
        return new Promise((resolve, reject) => {
            axios_1.default.post(this.fullUrl + `/addrs/utxo`, payload, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    address_getSummary(address, callback) {
        if (!this.isStringOrNonEmptyArray(address)) {
            return new Promise((resolve, reject) => {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'address required'
                }, callback);
            });
        }
        let addrs = [];
        if (!Array.isArray(address)) {
            addrs.push(address);
        }
        else {
            addrs = address;
        }
        return new Promise((resolve, reject) => {
            axios_1.default.get(this.fullUrl + `/addr/${address}`, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    address_getTxsOptions(address, options, callback) {
        if (!this.isStringOrNonEmptyArray(address)) {
            return new Promise((resolve, reject) => {
                this.callbackAndResolve(resolve, {
                    message: 'address required'
                }, callback);
            });
        }
        let addrs = [];
        if (!Array.isArray(address)) {
            addrs.push(address);
        }
        else {
            addrs = address;
        }
        return new Promise((resolve, reject) => {
            let payload = {
                addrs: Array.isArray(addrs) ? addrs.join(',') : addrs
            };
            if (options && options.fromIndex) {
                payload.fromIndex = options.fromIndex;
            }
            if (options && options.toIndex) {
                payload.toIndex = options.toIndex;
            }
            if (options && options.includeAsm) {
                payload.includeAsm = options.includeAsm;
            }
            if (options && options.includeHex) {
                payload.includeHex = options.includeHex;
            }
            axios_1.default.post(this.fullUrl + `/addrs/txs`, payload, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    address_getTxs(address, fromIndex = 0, toIndex = 20, noAsm = true, noScript = true, noSpent = true, callback) {
        if (!this.isStringOrNonEmptyArray(address)) {
            return new Promise((resolve, reject) => {
                this.callbackAndResolve(resolve, {
                    message: 'address required'
                }, callback);
            });
        }
        let addrs = [];
        if (!Array.isArray(address)) {
            addrs.push(address);
        }
        else {
            addrs = address;
        }
        return new Promise((resolve, reject) => {
            let payload = {
                addrs: Array.isArray(addrs) ? addrs.join(',') : addrs
            };
            if (fromIndex) {
                payload.fromIndex = fromIndex;
            }
            if (toIndex) {
                payload.toIndex = toIndex;
            }
            if (noAsm) {
                payload.noAsm = noAsm;
            }
            if (noScript) {
                payload.noScript = noScript;
            }
            if (noSpent) {
                payload.noSpent = noSpent;
            }
            axios_1.default.post(this.options.api_url + `/api/addrs/txs`, payload, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback);
            });
        });
    }
    sendTx(rawtx, callback) {
        return new Promise((resolve, reject) => {
            axios_1.default.post(this.fullUrl + `/tx/send`, { rawtx }, {
                headers: this.getHeaders()
            }).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, ex.response.data, callback);
            });
        });
    }
}
exports.APIClient = APIClient;
