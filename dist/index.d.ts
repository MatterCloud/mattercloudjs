export declare class MatterCloud {
    options: any;
    constructor(providedOptions?: any);
    setApiKey(key: string): void;
    setOptions(newOptions: any): void;
    getScriptHashUtxos(scripthash: string, args: {}, callback?: Function): Promise<any>;
    getScriptHashHistory(scripthash: string, args: {}, callback?: Function): Promise<any>;
    getUtxos(addrs: string, args: {
        offset?: number;
        limit?: number;
        afterHeight?: number;
        sort?: string;
    }, callback?: Function): Promise<any>;
    getBalance(addr: string, callback?: Function): Promise<any>;
    getBalanceBatch(addrs: string[], callback?: Function): Promise<any>;
    getHistory(addr: string, args?: {
        from?: number;
        to?: number;
    }, callback?: Function): Promise<any>;
    getHistoryBatch(addrs: string[], args?: {
        from?: number;
        to?: number;
    }, callback?: Function): Promise<any>;
    getTx(txid: string, callback?: Function): Promise<any>;
    getTxRaw(txid: string, callback?: Function): Promise<any>;
    getTxBatch(txids: string[], callback?: Function): Promise<any>;
    sendRawTx(rawtx: string, callback?: Function): Promise<any>;
    merchantTxBroadcast(rawtx: string, callback?: Function): Promise<any>;
    merchantTxStatus(rawtx: string, callback?: Function): Promise<any>;
    static instance(newOptions?: any): MatterCloud;
}
export declare function instance(newOptions?: any): MatterCloud;
