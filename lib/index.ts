import { APIClient } from './api-client';

const defaultOptions: any = {
  api_url: 'https://api.mattercloud.net',
  network: 'main',          // 'main', test', or 'stn'. 'main' and 'test' supported
  version_path: 'api/v3',   // Do not change
  api_key: ''               // Set to your API key
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

  getTxBatch(txids: string[], callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.tx_getTransactionsBatch(txids, callback);
  }

  // @Deprecated
  sendRawTx(rawtx: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.sendRawTx(rawtx, callback);
  }

  merchantTxBroadcast(rawtx: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.merchants_broadcastTx(rawtx, callback);
  }
  merchantTxStatus(rawtx: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.merchants_statusTx(rawtx, callback);
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

try {
  if (window) {
    window['mattercloud'] = new MatterCloud();
  }
}
catch (ex) {
  // Window is not defined, must be running in windowless env....
}
