import axios from 'axios';

export interface MatterCloudApiClientOptions {
    api_url: string;
    api_key?: string;
    network: string;
    version_path: string;
}

const defaultOptions: MatterCloudApiClientOptions = {
    api_url: 'https://api.mattercloud.net', // endpoint
    network: 'main',                        // 'test', or 'stn'
    version_path: 'api/v3',                 // Leave as is
    // api_key: 'your api key ',            // Get a key at www.mattercloud.net
}
/**
 * API Client
 */
export class APIClient {
    options = defaultOptions;
    fullUrl;
    constructor(options: any) {
        this.options = Object.assign({}, this.options, options);
        this.fullUrl = `${this.options.api_url}/${this.options.version_path}/${this.options.network}`;
    }

    // Populate api reqest header if it's set
    getHeaders(): any {
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
    private resolveOrCallback(resolve?: Function, data?: any, callback?: Function) {
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
    private rejectOrCallback(reject?: Function, err?: any, callback?: Function) {
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
    private formatErrorResponse(r: any): any {
        // let getMessage = r && r.response && r.response.data ? r.response.data : r.toString();
        let getMessage = r && r.response && r.response.data ? r.response.data : r;
        return {
            success: getMessage.success ? getMessage.success : false,
            code: getMessage.code ? getMessage.code : -1,
            message: getMessage.message ? getMessage.message : '',
            error: getMessage.error ? getMessage.error : '',
        };
    }

    tx_getTransaction(txid: string, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!txid || /^(\s*)$/.test(txid)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'txid required'
                }), callback)
            }
            axios.get(this.fullUrl + `/tx/${txid}`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback)
            })
        });
    }

    tx_getTransactionsBatch(txids: string[], callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(txids)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'txid required'
                }), callback)
            }
            let payload: any = {
                txids: Array.isArray(txids) ? txids.join(',') : txids
            };
            axios.post(this.fullUrl + `/tx`,
                payload,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback)
            })
        });
    }

    address_getBalance(addr: any, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(addr)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'address required'
                }), callback)
            }
            axios.get(this.fullUrl + `/address/${addr}/balance`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback)
            })
        });
    }

    address_getHistory(addr: any, options?: {from?: number, to?: number }, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(addr)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'address required'
                }), callback)
            }
            let args = '';
            if (options && options.from) {
                args += `from=${options.from}&`;
            }
            if (options && options.to) {
                args += `to=${options.to}&`;
            }
            const url = this.fullUrl + `/address/${addr}/history?${args}`;
            axios.get(url,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback)
            })
        });
    }

    address_getBalanceBatch(addrs: string[], callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(addrs)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'address required'
                }), callback)
            }
            let addrsNew: string[] = [];
            if (!Array.isArray(addrs)) {
                addrsNew.push(addrs);
            } else {
                addrsNew = addrs;
            }

            let payload: any = {
                addrs: Array.isArray(addrsNew) ? addrsNew.join(',') : addrsNew
            };
            axios.post(this.fullUrl + `/address/balance`,
                payload,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback)
            })
        });
    }

    address_getHistoryBatch(addrs: string[], options?: {from?: number, to?: number }, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(addrs)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'address required'
                }), callback)
            }
            let addrsNew: string[] = [];
            if (!Array.isArray(addrs)) {
                addrsNew.push(addrs);
            } else {
                addrsNew = addrs;
            }

            let payload: any = {
                addrs: Array.isArray(addrsNew) ? addrsNew.join(',') : addrsNew
            };

            if (options && options.from) {
                payload.from = options.from;
            }
            if (options && options.from) {
                payload.to = options.to;
            }

            axios.post(this.fullUrl + `/address/history`,
                payload,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback)
            })
        });
    }

    private isStringOrNonEmptyArray(item: any):  boolean {
        if (!item) {
            return false;
        }

        if (Array.isArray(item) && !item.length) {
            return false;
        }
        return true;
    }

    scripthash_getHistory(scripthash: any, options?: {from?: number, to?: number }, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(scripthash)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'scripthash required'
                }), callback)
            }
            let args = '';
            if (options && options.from) {
                args += `from=${options.from}&`;
            }
            if (options && options.to) {
                args += `to=${options.to}&`;
            }
            const url = this.fullUrl + `/scripts/${scripthash}/history?${args}`;
            axios.get(url,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback)
            })
        });
    }

    scripthash_getUtxos(args: { scripthash: any }, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(args.scripthash)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'scripthash required',
                    error: 'scripthash required'
                }), callback)
            }
            let scripthashes: string[] = [];
            if (!Array.isArray(args.scripthash)) {
                scripthashes.push(args.scripthash);
            } else {
                scripthashes = args.scripthash;
            }

            let payload: any = {
                scripthash: Array.isArray(scripthashes) ? scripthashes.join(',') : scripthashes
            };
            axios.post(this.fullUrl + `/scripts/utxo`,
                payload,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback)
            })
        });
    }

    addresses_getUtxos(args: { addrs: any, offset?: number, limit?: number, afterHeight?: number, sort?: string}, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.isStringOrNonEmptyArray(args.addrs)) {
                return this.rejectOrCallback(reject, this.formatErrorResponse({
                    code: 422,
                    message: 'address required'
                }), callback)
            }
            let addrs: string[] = [];
            if (!Array.isArray(args.addrs)) {
                addrs.push(args.addrs);
            } else {
                addrs = args.addrs;
            }

            let payload: any = {
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
            axios.post(this.fullUrl + `/address/utxo`,
                payload,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback)
            })
        });
    }
    // Deprecated, use broadcastTx
    sendRawTx(rawtx: string, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.post(this.fullUrl + `/tx/send`,
                { rawtx },
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback)
            })
        });
    }
    merchants_broadcastTx(rawtx: string, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.post(this.fullUrl + `/merchants/tx/broadcast`,
                { rawtx },
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback)
            })
        });
    }

    merchants_statusTx(txid: string, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.get(this.fullUrl + `/merchants/tx/status/${txid}`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                return this.resolveOrCallback(resolve, response.data, callback);
            }).catch((ex) => {
                return this.rejectOrCallback(reject, this.formatErrorResponse(ex), callback)
            })
        });
    }
}