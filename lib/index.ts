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

  utxos(addrs: string, args: { offset?: number, limit?: number, afterHeight?: number, sort?: string}, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.addresses_getUtxos({
      addrs,
      ...args
    }, callback);
  }

  balance(addr: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.address_getBalance(addr, callback);
  }

  balanceBatch(addrs: string[], callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.address_getBalanceBatch(addrs, callback);
  }

  tx(txid: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.tx_getTransaction(txid, callback);
  }

  sendRawTx(rawtx: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.sendRawTx(rawtx, callback);
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
