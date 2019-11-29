export declare class MatterCloud {
    options: any;
    constructor(providedOptions?: any);
    setApiKey(key: string): void;
    setOptions(newOptions: any): void;
    utxos(addrs: string, args: {
        offset?: number;
        limit?: number;
        afterHeight?: number;
        sort?: string;
    }, callback?: Function): Promise<any>;
    balance(addr: string, callback?: Function): Promise<any>;
    balanceBatch(addrs: string[], callback?: Function): Promise<any>;
    tx(txid: string, callback?: Function): Promise<any>;
    sendRawTx(rawtx: string, callback?: Function): Promise<any>;
    static instance(newOptions?: any): MatterCloud;
}
export declare function instance(newOptions?: any): MatterCloud;
