import axios from 'axios';

export interface MatterCloudApiClientOptions {
    api_url: string;
    api_key?: string;
    network: string;
    version_path: string;
}

const defaultOptions: MatterCloudApiClientOptions = {
    api_url: 'localhost:3000',
    network: 'main', // 'test', or 'stn'
    version_path: 'api/v3',
    // api_key: 'your api key ', // Get a key at www.mattercloud.net
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
     * @param resolveOrReject Resolve or reject function to call when done
     * @param data Data to pass forward
     * @param callback Invoke an optional callback first
     */
    private callbackAndResolve(resolveOrReject: Function, data: any, callback?: Function) {
        if (callback) {
            callback(data);
        }
        if (resolveOrReject) {
            return resolveOrReject(data);
        }
    }

    tx_getTransaction(txid: string, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!txid || /^(\s*)$/.test(txid)) {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'txid required'
                }, callback);
            }
            axios.get(this.fullUrl + `/tx/${txid}`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);

            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }

    blockheader(blockhash: string, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
             if (!blockhash || /^(\s*)$/.test(blockhash)) {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'blockhash required'
                }, callback);
            }
            axios.get(this.fullUrl + `/blockheader/${blockhash}`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }

    block(blockhash: string, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
             if (!blockhash || /^(\s*)$/.test(blockhash)) {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'blockhash required'
                }, callback);
            }
            axios.get(this.fullUrl + `/block/${blockhash}`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }

    getBlockHeaders(args: { fromBlockHash?: string, fromHeight?: number, order?: string, limit?: number }, callback?: Function): Promise<any> {
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
            axios.get(url,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }

    rawblock(blockhash: string, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
             if (!blockhash || /^(\s*)$/.test(blockhash)) {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'blockhash required'
                }, callback);
            }
            axios.get(this.fullUrl + `/rawblock/${blockhash}`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }
    blockhash(blockhash: string, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
             if (!blockhash || /^(\s*)$/.test(blockhash)) {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'blockhash required'
                }, callback);
            }
            axios.get(this.fullUrl + `/rawblock/${blockhash}`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }
    blockindex(height: any, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
             if (!height || /^(\s*)$/.test(height)) {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'height required'
                }, callback);
            }
            axios.get(this.fullUrl + `/block-index/${height}`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }

    status_getBestBlockHash(callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.get(this.options.api_url + `/api/status?q=getBestBlockHash`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }

    status_getLastBlockHash(callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.get(this.options.api_url + `/api/status?q=getLastBlockHash`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }

    status_getDifficulty(callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.get(this.options.api_url + `/api/status?q=getDifficulty`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }

    status(callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.get(this.options.api_url + `/api/status`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }

    address_getBalance(addr: any, callback?: Function): Promise<any> {
        if (!this.isStringOrNonEmptyArray(addr)) {
            return new Promise((resolve, reject) => {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'address required'
                }, callback)
            });
        }
        return new Promise((resolve, reject) => {
            axios.get(this.fullUrl + `/addrs/${addr}/balance`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }

    address_getBalanceBatch(addrs: string[], callback?: Function): Promise<any> {
        if (!this.isStringOrNonEmptyArray(addrs)) {
            return new Promise((resolve, reject) => {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'address required'
                }, callback)
            });
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

        return new Promise((resolve, reject) => {
            axios.post(this.fullUrl + `/addrs/balance`,
                payload,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
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

    addresses_getUtxos(args: { addrs: any, offset?: number, limit?: number, afterHeight?: number, sort?: string}, callback?: Function): Promise<any> {
        if (!this.isStringOrNonEmptyArray(args.addrs)) {
            return new Promise((resolve, reject) => {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'address required'
                }, callback)
            });
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

        return new Promise((resolve, reject) => {
            axios.post(this.fullUrl + `/addrs/utxo`,
                payload,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }

    address_getSummary(address: any, callback?: Function): Promise<any> {
        if (!this.isStringOrNonEmptyArray(address)) {
            return new Promise((resolve, reject) => {
                this.callbackAndResolve(resolve, {
                    code: 422,
                    message: 'address required'
                }, callback)
            });
        }
        let addrs: string[] = [];
        if (!Array.isArray(address)) {
            addrs.push(address);
        } else {
            addrs = address;
        }

        return new Promise((resolve, reject) => {
            axios.get(this.fullUrl + `/addr/${address}`,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }

    address_getTxsOptions(address: any,
        options?: {
            fromIndex?: number,
            toIndex?: number,
            afterHeight?: number,
            afterBlockHash?: string,
            includeAsm?: boolean,
            includeHex?: boolean
        },
        callback?: Function): Promise<any> {

            if (!this.isStringOrNonEmptyArray(address)) {
            return new Promise((resolve, reject) => {
                this.callbackAndResolve(resolve, {
                    message: 'address required'
                }, callback)
            });
        }
        let addrs: string[] = [];
        if (!Array.isArray(address)) {
            addrs.push(address);
        } else {
            addrs = address;
        }

        return new Promise((resolve, reject) => {

            let payload: any = {
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

            axios.post(this.fullUrl + `/addrs/txs`,
                payload,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }

    address_getTxs(address: any, fromIndex: number = 0, toIndex: number = 20, noAsm: boolean = true, noScript: boolean = true, noSpent: boolean = true, callback?: Function): Promise<any> {
        if (!this.isStringOrNonEmptyArray(address)) {
            return new Promise((resolve, reject) => {
                this.callbackAndResolve(resolve, {
                    message: 'address required'
                }, callback)
            });
        }
        let addrs: string[] = [];
        if (!Array.isArray(address)) {
            addrs.push(address);
        } else {
            addrs = address;
        }

        return new Promise((resolve, reject) => {

            let payload: any = {
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

            axios.post(this.options.api_url + `/api/addrs/txs`,
                payload,
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, {
                    code: ex.response.status,
                    message: ex.message ? ex.message : ex.toString()
                }, callback)
            })
        });
    }

    sendTx(rawtx: string, callback?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.post(this.fullUrl + `/tx/send`,
                { rawtx },
                {
                    headers: this.getHeaders()
                }
            ).then((response) => {
                this.callbackAndResolve(resolve, response.data, callback);
            }).catch((ex) => {
                this.callbackAndResolve(resolve, ex.response.data, callback)
            })
        });
    }
}