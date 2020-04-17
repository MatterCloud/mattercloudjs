import { APIClient } from './api-client';

const defaultOptions: any = {
  api_url: 'https://api.mattercloud.net',
  merchantapi_url: 'https://merchantapi.matterpool.io',
  network: 'main',          // 'main', test', or 'stn'. 'main' and 'test' supported
  version_path: 'api/v3',   // Do not change
  api_key: ''               // Set to your API key
}

export class MerchantApi {
  options;
  constructor(providedOptions?: any) {
    this.options = Object.assign({}, defaultOptions, providedOptions);
  }

  submitTx(rawtx: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.mapi_submitTx(rawtx, callback);
  }

  getTxStatus(txid: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.mapi_statusTx(txid, callback);
  }

  getFeeQuote(callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.mapi_feeQuote(callback);
  }

  static instance(newOptions?: any): MerchantApi {
    const mergedOptions = Object.assign({}, defaultOptions, newOptions);
    return new MerchantApi(mergedOptions);
  }
}

export class MatterCloud {
  options;
  constructor(providedOptions?: any) {
    this.options = Object.assign({}, defaultOptions, providedOptions);
  }

  setApiKey(key: string) {
    this.options = Object.assign({}, this.options, { api_key: key });
  }

  setOptions(newOptions) {
    this.options = Object.assign({}, this.options, newOptions);
  }

  getScriptHashUtxos(scripthash: string, args: { }, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.scripthash_getUtxos({
      scripthash,
      ...args
    }, callback);
  }

  getScriptHashHistory(scripthash: string, args: { }, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.scripthash_getHistory(scripthash,{
      ...args
    }, callback);
  }

  getUtxos(addrs: string, args: { offset?: number, limit?: number, afterHeight?: number, sort?: string}, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.addresses_getUtxos({
      addrs,
      ...args
    }, callback);
  }


  getBalance(addr: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.address_getBalance(addr, callback);
  }

  getBalanceBatch(addrs: string[], callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.address_getBalanceBatch(addrs, callback);
  }

  getHistory(addr: string, args?: {from?: number, to?: number }, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.address_getHistory(addr, args, callback);
  }

  getHistoryBatch(addrs: string[], args?: {from?: number, to?: number }, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.address_getHistoryBatch(addrs, args, callback);
  }

  getTx(txid: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.tx_getTransaction(txid, callback);
  }

  getTxRaw(txid: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.tx_getRawTransaction(txid, callback);
  }

  getTxBatch(txids: string[], callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.tx_getTransactionsBatch(txids, callback);
  }

  // @Deprecated
  // Use merchantapi mapi.submitTx
  sendRawTx(rawtx: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.sendRawTx(rawtx, callback);
  }
  // @Deprecated
  // Use merchantapi mapi.submitTx
  merchantTxBroadcast(rawtx: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.merchants_broadcastTx(rawtx, callback);
  }
  // @Deprecated
  // Use merchantapi mapi.getTxStatus
  merchantTxStatus(txid: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.merchants_statusTx(txid, callback);
  }

  get mapi() {
    return new MerchantApi(this.options);
  }

  static instance(newOptions?: any): MatterCloud {
    const mergedOptions = Object.assign({}, defaultOptions, newOptions);
    return new MatterCloud(mergedOptions);
  }
}

export function instance(newOptions?: any): MatterCloud {
  const mergedOptions = Object.assign({}, defaultOptions, newOptions);
  return new MatterCloud(mergedOptions);
}

export function mapi(newOptions?: any): MerchantApi {
  const mergedOptions = Object.assign({}, defaultOptions, newOptions);
  return new MerchantApi(mergedOptions);
}

try {
  if (window) {
    window['mattercloud'] = new MatterCloud();
    window['merchantapi'] = new MerchantApi();
  }
}
catch (ex) {
  // Window is not defined, must be running in windowless env....
}
