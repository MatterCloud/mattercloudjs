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
     * @param resolve Resolve function to call when done
     * @param data Data to pass forward
     * @param callback Invoke an optional callback first
     */
    private resolveOrCallback;
    /**
    * Resolve a promise and/or invoke a callback
    * @param reject Reject function to call when done
    * @param data Data to pass forward
    * @param callback Invoke an optional callback first
    */
    private rejectOrCallback;
    private formatErrorResponse;
    tx_getTransaction(txid: string, callback?: Function): Promise<any>;
    tx_getRawTransaction(txid: string, callback?: Function): Promise<any>;
    tx_getTransactionsBatch(txids: string[], callback?: Function): Promise<any>;
    address_getBalance(addr: any, callback?: Function): Promise<any>;
    address_getHistory(addr: any, options?: {
        from?: number;
        to?: number;
    }, callback?: Function): Promise<any>;
    address_getBalanceBatch(addrs: string[], callback?: Function): Promise<any>;
    address_getHistoryBatch(addrs: string[], options?: {
        from?: number;
        to?: number;
    }, callback?: Function): Promise<any>;
    private isStringOrNonEmptyArray;
    scripthash_getHistory(scripthash: any, options?: {
        from?: number;
        to?: number;
    }, callback?: Function): Promise<any>;
    scripthash_getUtxos(args: {
        scripthash: any;
    }, callback?: Function): Promise<any>;
    addresses_getUtxos(args: {
        addrs: any;
        offset?: number;
        limit?: number;
        afterHeight?: number;
        sort?: string;
    }, callback?: Function): Promise<any>;
    sendRawTx(rawtx: string, callback?: Function): Promise<any>;
    merchants_broadcastTx(rawtx: string, callback?: Function): Promise<any>;
    merchants_statusTx(txid: string, callback?: Function): Promise<any>;
}
