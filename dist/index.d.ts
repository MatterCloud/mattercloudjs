export default class MatterCloud {
    options: any;
    constructor(providedOptions?: any);
    utxos(addrs: string, args: {
        offset?: number;
        limit?: number;
        afterHeight?: number;
        sort?: string;
    }, callback?: Function): Promise<any>;
    balance(addr: string, callback?: Function): Promise<any>;
    balanceBatch(addrs: string[], callback?: Function): Promise<any>;
    getTx(txid: string, callback?: Function): Promise<any>;
    sendRawTx(rawtx: string, callback?: Function): Promise<any>;
}
export declare function instance(options?: any): MatterCloud;
