import { APIClient } from './api-client';

const defaultOptions: any = {
  api_url: 'https://api.bitindex.network',
  network: 'main',          // 'main', test', or 'stn'. 'main' and 'test' supported
  version_path: 'api/v3',   // Do not change
  api_key: ''               // Set to your API key
}

export default class MatterCloud {
  options;
  constructor(providedOptions?: any) {
    this.options = Object.assign({}, defaultOptions, providedOptions);
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

  getTx(txid: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.tx_getTransaction(txid, callback);
  }

  sendRawTx(rawtx: string, callback?: Function): Promise<any> {
    const apiClient = new APIClient(this.options);
    return apiClient.sendTx(rawtx, callback);
  }
}

export function instance(options?: any): MatterCloud {
  const mergedOptions = Object.assign({}, defaultOptions, options);
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
