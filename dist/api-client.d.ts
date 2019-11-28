export interface MatterCloudApiClientOptions {
    api_url: string;
    api_key?: string;
    network: string;
    version_path: string;
}
/**
 * API Client
 */
export declare class APIClient {
    options: MatterCloudApiClientOptions;
    fullUrl: any;
    constructor(options: any);
    getHeaders(): any;
    /**
     * Resolve a promise and/or invoke a callback
     * @param resolveOrReject Resolve or reject function to call when done
     * @param data Data to pass forward
     * @param callback Invoke an optional callback first
     */
    private callbackAndResolve;
    tx_getTransaction(txid: string, callback?: Function): Promise<any>;
    blockheader(blockhash: string, callback?: Function): Promise<any>;
    block(blockhash: string, callback?: Function): Promise<any>;
    getBlockHeaders(args: {
        fromBlockHash?: string;
        fromHeight?: number;
        order?: string;
        limit?: number;
    }, callback?: Function): Promise<any>;
    rawblock(blockhash: string, callback?: Function): Promise<any>;
    blockhash(blockhash: string, callback?: Function): Promise<any>;
    blockindex(height: any, callback?: Function): Promise<any>;
    status_getBestBlockHash(callback?: Function): Promise<any>;
    status_getLastBlockHash(callback?: Function): Promise<any>;
    status_getDifficulty(callback?: Function): Promise<any>;
    status(callback?: Function): Promise<any>;
    address_getBalance(addr: any, callback?: Function): Promise<any>;
    address_getBalanceBatch(addrs: string[], callback?: Function): Promise<any>;
    private isStringOrNonEmptyArray;
    addresses_getUtxos(args: {
        addrs: any;
        offset?: number;
        limit?: number;
        afterHeight?: number;
        sort?: string;
    }, callback?: Function): Promise<any>;
    address_getSummary(address: any, callback?: Function): Promise<any>;
    address_getTxsOptions(address: any, options?: {
        fromIndex?: number;
        toIndex?: number;
        afterHeight?: number;
        afterBlockHash?: string;
        includeAsm?: boolean;
        includeHex?: boolean;
    }, callback?: Function): Promise<any>;
    address_getTxs(address: any, fromIndex?: number, toIndex?: number, noAsm?: boolean, noScript?: boolean, noSpent?: boolean, callback?: Function): Promise<any>;
    sendTx(rawtx: string, callback?: Function): Promise<any>;
}
