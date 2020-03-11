/**
 * mattercloudjs - MatterCloud Javascript SDK - https://www.mattercloud.net
 * @version v1.0.13
 * @link https://github.com/MatterCloud/mattercloudjs#readme
 *
 * Copyright (c) 2019 MatterCloud (Matter Web Services Inc.)
 *
 * Open BSV License
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * 1 - The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 2 - The Software, and any software that is derived from the Software or parts thereof,
 * can only be used on the Bitcoin SV blockchains. The Bitcoin SV blockchains are defined,
 * for purposes of this license, as the Bitcoin blockchain containing block height #556767
 * with the hash "000000000000000001d956714215d96ffc00e0afda4cd0a96c96f8d802b1662b" and
 * the test blockchains that are supported by the un-modified Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
!function(){return function e(t,r,s){function n(i,a){if(!r[i]){if(!t[i]){var c="function"==typeof require&&require;if(!a&&c)return c(i,!0);if(o)return o(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var l=r[i]={exports:{}};t[i][0].call(l.exports,function(e){return n(t[i][1][e]||e)},l,l.exports,e,t,r,s)}return r[i].exports}for(var o="function"==typeof require&&require,i=0;i<s.length;i++)n(s[i]);return n}}()({1:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});const s=e("axios"),n={api_url:"https://api.mattercloud.net",network:"main",version_path:"api/v3"};r.APIClient=class{constructor(e){this.options=n,this.options=Object.assign({},this.options,e),this.fullUrl=`${this.options.api_url}/${this.options.version_path}/${this.options.network}`}getHeaders(){return this.options.api_key&&""!==this.options.api_key?{api_key:this.options.api_key}:{}}resolveOrCallback(e,t,r){if(!r)return e?e(t):new Promise((e,r)=>e(t));r(t)}rejectOrCallback(e,t,r){if(!r)return e?e(t):new Promise((e,r)=>{r(t)});r(null,t)}formatErrorResponse(e){let t=e&&e.response&&e.response.data?e.response.data:e;return{success:!!t.success&&t.success,code:t.code?t.code:-1,message:t.message?t.message:"",error:t.error?t.error:""}}tx_getTransaction(e,t){return new Promise((r,n)=>{if(!e||/^(\s*)$/.test(e))return this.rejectOrCallback(n,this.formatErrorResponse({code:422,message:"txid required"}),t);s.default.get(this.fullUrl+`/tx/${e}`,{headers:this.getHeaders()}).then(e=>this.resolveOrCallback(r,e.data,t)).catch(e=>this.rejectOrCallback(n,this.formatErrorResponse(e),t))})}tx_getRawTransaction(e,t){return new Promise((r,n)=>{if(!e||/^(\s*)$/.test(e))return this.rejectOrCallback(n,this.formatErrorResponse({code:422,message:"txid required"}),t);s.default.get(this.fullUrl+`/rawtx/${e}`,{headers:this.getHeaders()}).then(e=>e.data&&e.data.rawtx?this.resolveOrCallback(r,e.data.rawtx,t):this.resolveOrCallback(r,e.data,t)).catch(e=>this.rejectOrCallback(n,this.formatErrorResponse(e),t))})}tx_getTransactionsBatch(e,t){return new Promise((r,n)=>{if(!this.isStringOrNonEmptyArray(e))return this.rejectOrCallback(n,this.formatErrorResponse({code:422,message:"txid required"}),t);let o={txids:Array.isArray(e)?e.join(","):e};s.default.post(this.fullUrl+"/tx",o,{headers:this.getHeaders()}).then(e=>this.resolveOrCallback(r,e.data,t)).catch(e=>this.rejectOrCallback(n,this.formatErrorResponse(e),t))})}address_getBalance(e,t){return new Promise((r,n)=>{if(!this.isStringOrNonEmptyArray(e))return this.rejectOrCallback(n,this.formatErrorResponse({code:422,message:"address required"}),t);s.default.get(this.fullUrl+`/address/${e}/balance`,{headers:this.getHeaders()}).then(e=>this.resolveOrCallback(r,e.data,t)).catch(e=>this.rejectOrCallback(n,this.formatErrorResponse(e),t))})}address_getHistory(e,t,r){return new Promise((n,o)=>{if(!this.isStringOrNonEmptyArray(e))return this.rejectOrCallback(o,this.formatErrorResponse({code:422,message:"address required"}),r);let i="";t&&t.from&&(i+=`from=${t.from}&`),t&&t.to&&(i+=`to=${t.to}&`);const a=this.fullUrl+`/address/${e}/history?${i}`;s.default.get(a,{headers:this.getHeaders()}).then(e=>this.resolveOrCallback(n,e.data,r)).catch(e=>this.rejectOrCallback(o,this.formatErrorResponse(e),r))})}address_getBalanceBatch(e,t){return new Promise((r,n)=>{if(!this.isStringOrNonEmptyArray(e))return this.rejectOrCallback(n,this.formatErrorResponse({code:422,message:"address required"}),t);let o=[];Array.isArray(e)?o=e:o.push(e);let i={addrs:Array.isArray(o)?o.join(","):o};s.default.post(this.fullUrl+"/address/balance",i,{headers:this.getHeaders()}).then(e=>this.resolveOrCallback(r,e.data,t)).catch(e=>this.rejectOrCallback(n,this.formatErrorResponse(e),t))})}address_getHistoryBatch(e,t,r){return new Promise((n,o)=>{if(!this.isStringOrNonEmptyArray(e))return this.rejectOrCallback(o,this.formatErrorResponse({code:422,message:"address required"}),r);let i=[];Array.isArray(e)?i=e:i.push(e);let a={addrs:Array.isArray(i)?i.join(","):i};t&&t.from&&(a.from=t.from),t&&t.from&&(a.to=t.to),s.default.post(this.fullUrl+"/address/history",a,{headers:this.getHeaders()}).then(e=>this.resolveOrCallback(n,e.data,r)).catch(e=>this.rejectOrCallback(o,this.formatErrorResponse(e),r))})}isStringOrNonEmptyArray(e){return!(!e||Array.isArray(e)&&!e.length)}scripthash_getHistory(e,t,r){return new Promise((n,o)=>{if(!this.isStringOrNonEmptyArray(e))return this.rejectOrCallback(o,this.formatErrorResponse({code:422,message:"scripthash required"}),r);let i="";t&&t.from&&(i+=`from=${t.from}&`),t&&t.to&&(i+=`to=${t.to}&`);const a=this.fullUrl+`/scripthash/${e}/history?${i}`;s.default.get(a,{headers:this.getHeaders()}).then(e=>this.resolveOrCallback(n,e.data,r)).catch(e=>this.rejectOrCallback(o,this.formatErrorResponse(e),r))})}scripthash_getUtxos(e,t){return new Promise((r,n)=>{if(!this.isStringOrNonEmptyArray(e.scripthash))return this.rejectOrCallback(n,this.formatErrorResponse({code:422,message:"scripthash required",error:"scripthash required"}),t);let o=[];Array.isArray(e.scripthash)?o=e.scripthash:o.push(e.scripthash);let i={scripthash:Array.isArray(o)?o.join(","):o};s.default.post(this.fullUrl+"/scripthash/utxo",i,{headers:this.getHeaders()}).then(e=>this.resolveOrCallback(r,e.data,t)).catch(e=>this.rejectOrCallback(n,this.formatErrorResponse(e),t))})}addresses_getUtxos(e,t){return new Promise((r,n)=>{if(!this.isStringOrNonEmptyArray(e.addrs))return this.rejectOrCallback(n,this.formatErrorResponse({code:422,message:"address required"}),t);let o=[];Array.isArray(e.addrs)?o=e.addrs:o.push(e.addrs);let i={addrs:Array.isArray(o)?o.join(","):o};e.offset&&(i.offset=e.offset),e.limit&&(i.limit=e.limit),e.afterHeight&&(i.afterHeight=e.afterHeight),e.sort&&(i.sort=e.sort),s.default.post(this.fullUrl+"/address/utxo",i,{headers:this.getHeaders()}).then(e=>this.resolveOrCallback(r,e.data,t)).catch(e=>this.rejectOrCallback(n,this.formatErrorResponse(e),t))})}sendRawTx(e,t){return new Promise((r,n)=>{s.default.post(this.fullUrl+"/tx/send",{rawtx:e},{headers:this.getHeaders()}).then(e=>this.resolveOrCallback(r,e.data,t)).catch(e=>this.rejectOrCallback(n,this.formatErrorResponse(e),t))})}merchants_broadcastTx(e,t){return new Promise((r,n)=>{s.default.post(this.fullUrl+"/merchants/tx/broadcast",{rawtx:e},{headers:this.getHeaders()}).then(e=>this.resolveOrCallback(r,e.data,t)).catch(e=>this.rejectOrCallback(n,this.formatErrorResponse(e),t))})}merchants_statusTx(e,t){return new Promise((r,n)=>{s.default.get(this.fullUrl+`/merchants/tx/status/${e}`,{headers:this.getHeaders()}).then(e=>this.resolveOrCallback(r,e.data,t)).catch(e=>this.rejectOrCallback(n,this.formatErrorResponse(e),t))})}}},{axios:3}],2:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});const s=e("./api-client"),n={api_url:"https://api.mattercloud.net",network:"main",version_path:"api/v3",api_key:""};class o{constructor(e){this.options=Object.assign({},n,e)}setApiKey(e){this.options=Object.assign({},this.options,{api_key:e})}setOptions(e){this.options=Object.assign({},this.options,e)}getScriptHashUtxos(e,t,r){return new s.APIClient(this.options).scripthash_getUtxos(Object.assign({scripthash:e},t),r)}getScriptHashHistory(e,t,r){return new s.APIClient(this.options).scripthash_getHistory(e,Object.assign({},t),r)}getUtxos(e,t,r){return new s.APIClient(this.options).addresses_getUtxos(Object.assign({addrs:e},t),r)}getBalance(e,t){return new s.APIClient(this.options).address_getBalance(e,t)}getBalanceBatch(e,t){return new s.APIClient(this.options).address_getBalanceBatch(e,t)}getHistory(e,t,r){return new s.APIClient(this.options).address_getHistory(e,t,r)}getHistoryBatch(e,t,r){return new s.APIClient(this.options).address_getHistoryBatch(e,t,r)}getTx(e,t){return new s.APIClient(this.options).tx_getTransaction(e,t)}getTxRaw(e,t){return new s.APIClient(this.options).tx_getRawTransaction(e,t)}getTxBatch(e,t){return new s.APIClient(this.options).tx_getTransactionsBatch(e,t)}sendRawTx(e,t){return new s.APIClient(this.options).sendRawTx(e,t)}merchantTxBroadcast(e,t){return new s.APIClient(this.options).merchants_broadcastTx(e,t)}merchantTxStatus(e,t){return new s.APIClient(this.options).merchants_statusTx(e,t)}static instance(e){const t=Object.assign({},n,e);return new o(t)}}r.MatterCloud=o,r.instance=function(e){const t=Object.assign({},n,e);return new o(t)};try{window&&(window.mattercloud=new o)}catch(e){}},{"./api-client":1}],3:[function(e,t,r){t.exports=e("./lib/axios")},{"./lib/axios":5}],4:[function(e,t,r){"use strict";var s=e("./../utils"),n=e("./../core/settle"),o=e("./../helpers/buildURL"),i=e("./../helpers/parseHeaders"),a=e("./../helpers/isURLSameOrigin"),c=e("../core/createError");t.exports=function(t){return new Promise(function(r,u){var l=t.data,h=t.headers;s.isFormData(l)&&delete h["Content-Type"];var f=new XMLHttpRequest;if(t.auth){var p=t.auth.username||"",d=t.auth.password||"";h.Authorization="Basic "+btoa(p+":"+d)}if(f.open(t.method.toUpperCase(),o(t.url,t.params,t.paramsSerializer),!0),f.timeout=t.timeout,f.onreadystatechange=function(){if(f&&4===f.readyState&&(0!==f.status||f.responseURL&&0===f.responseURL.indexOf("file:"))){var e="getAllResponseHeaders"in f?i(f.getAllResponseHeaders()):null,s={data:t.responseType&&"text"!==t.responseType?f.response:f.responseText,status:f.status,statusText:f.statusText,headers:e,config:t,request:f};n(r,u,s),f=null}},f.onerror=function(){u(c("Network Error",t,null,f)),f=null},f.ontimeout=function(){u(c("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED",f)),f=null},s.isStandardBrowserEnv()){var m=e("./../helpers/cookies"),g=(t.withCredentials||a(t.url))&&t.xsrfCookieName?m.read(t.xsrfCookieName):void 0;g&&(h[t.xsrfHeaderName]=g)}if("setRequestHeader"in f&&s.forEach(h,function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete h[t]:f.setRequestHeader(t,e)}),t.withCredentials&&(f.withCredentials=!0),t.responseType)try{f.responseType=t.responseType}catch(e){if("json"!==t.responseType)throw e}"function"==typeof t.onDownloadProgress&&f.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&f.upload&&f.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then(function(e){f&&(f.abort(),u(e),f=null)}),void 0===l&&(l=null),f.send(l)})}},{"../core/createError":11,"./../core/settle":14,"./../helpers/buildURL":18,"./../helpers/cookies":20,"./../helpers/isURLSameOrigin":22,"./../helpers/parseHeaders":24,"./../utils":26}],5:[function(e,t,r){"use strict";var s=e("./utils"),n=e("./helpers/bind"),o=e("./core/Axios"),i=e("./defaults");function a(e){var t=new o(e),r=n(o.prototype.request,t);return s.extend(r,o.prototype,t),s.extend(r,t),r}var c=a(i);c.Axios=o,c.create=function(e){return a(s.merge(i,e))},c.Cancel=e("./cancel/Cancel"),c.CancelToken=e("./cancel/CancelToken"),c.isCancel=e("./cancel/isCancel"),c.all=function(e){return Promise.all(e)},c.spread=e("./helpers/spread"),t.exports=c,t.exports.default=c},{"./cancel/Cancel":6,"./cancel/CancelToken":7,"./cancel/isCancel":8,"./core/Axios":9,"./defaults":16,"./helpers/bind":17,"./helpers/spread":25,"./utils":26}],6:[function(e,t,r){"use strict";function s(e){this.message=e}s.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},s.prototype.__CANCEL__=!0,t.exports=s},{}],7:[function(e,t,r){"use strict";var s=e("./Cancel");function n(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var r=this;e(function(e){r.reason||(r.reason=new s(e),t(r.reason))})}n.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},n.source=function(){var e;return{token:new n(function(t){e=t}),cancel:e}},t.exports=n},{"./Cancel":6}],8:[function(e,t,r){"use strict";t.exports=function(e){return!(!e||!e.__CANCEL__)}},{}],9:[function(e,t,r){"use strict";var s=e("./../defaults"),n=e("./../utils"),o=e("./InterceptorManager"),i=e("./dispatchRequest");function a(e){this.defaults=e,this.interceptors={request:new o,response:new o}}a.prototype.request=function(e){"string"==typeof e&&(e=n.merge({url:arguments[0]},arguments[1])),(e=n.merge(s,{method:"get"},this.defaults,e)).method=e.method.toLowerCase();var t=[i,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)r=r.then(t.shift(),t.shift());return r},n.forEach(["delete","get","head","options"],function(e){a.prototype[e]=function(t,r){return this.request(n.merge(r||{},{method:e,url:t}))}}),n.forEach(["post","put","patch"],function(e){a.prototype[e]=function(t,r,s){return this.request(n.merge(s||{},{method:e,url:t,data:r}))}}),t.exports=a},{"./../defaults":16,"./../utils":26,"./InterceptorManager":10,"./dispatchRequest":12}],10:[function(e,t,r){"use strict";var s=e("./../utils");function n(){this.handlers=[]}n.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},n.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},n.prototype.forEach=function(e){s.forEach(this.handlers,function(t){null!==t&&e(t)})},t.exports=n},{"./../utils":26}],11:[function(e,t,r){"use strict";var s=e("./enhanceError");t.exports=function(e,t,r,n,o){var i=new Error(e);return s(i,t,r,n,o)}},{"./enhanceError":13}],12:[function(e,t,r){"use strict";var s=e("./../utils"),n=e("./transformData"),o=e("../cancel/isCancel"),i=e("../defaults"),a=e("./../helpers/isAbsoluteURL"),c=e("./../helpers/combineURLs");function u(e){e.cancelToken&&e.cancelToken.throwIfRequested()}t.exports=function(e){return u(e),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=n(e.data,e.headers,e.transformRequest),e.headers=s.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),s.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||i.adapter)(e).then(function(t){return u(e),t.data=n(t.data,t.headers,e.transformResponse),t},function(t){return o(t)||(u(e),t&&t.response&&(t.response.data=n(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},{"../cancel/isCancel":8,"../defaults":16,"./../helpers/combineURLs":19,"./../helpers/isAbsoluteURL":21,"./../utils":26,"./transformData":15}],13:[function(e,t,r){"use strict";t.exports=function(e,t,r,s,n){return e.config=t,r&&(e.code=r),e.request=s,e.response=n,e}},{}],14:[function(e,t,r){"use strict";var s=e("./createError");t.exports=function(e,t,r){var n=r.config.validateStatus;r.status&&n&&!n(r.status)?t(s("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},{"./createError":11}],15:[function(e,t,r){"use strict";var s=e("./../utils");t.exports=function(e,t,r){return s.forEach(r,function(r){e=r(e,t)}),e}},{"./../utils":26}],16:[function(e,t,r){(function(r){"use strict";var s=e("./utils"),n=e("./helpers/normalizeHeaderName"),o={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!s.isUndefined(e)&&s.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,c={adapter:("undefined"!=typeof XMLHttpRequest?a=e("./adapters/xhr"):void 0!==r&&(a=e("./adapters/http")),a),transformRequest:[function(e,t){return n(t,"Content-Type"),s.isFormData(e)||s.isArrayBuffer(e)||s.isBuffer(e)||s.isStream(e)||s.isFile(e)||s.isBlob(e)?e:s.isArrayBufferView(e)?e.buffer:s.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):s.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},s.forEach(["delete","get","head"],function(e){c.headers[e]={}}),s.forEach(["post","put","patch"],function(e){c.headers[e]=s.merge(o)}),t.exports=c}).call(this,e("_process"))},{"./adapters/http":4,"./adapters/xhr":4,"./helpers/normalizeHeaderName":23,"./utils":26,_process:28}],17:[function(e,t,r){"use strict";t.exports=function(e,t){return function(){for(var r=new Array(arguments.length),s=0;s<r.length;s++)r[s]=arguments[s];return e.apply(t,r)}}},{}],18:[function(e,t,r){"use strict";var s=e("./../utils");function n(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}t.exports=function(e,t,r){if(!t)return e;var o;if(r)o=r(t);else if(s.isURLSearchParams(t))o=t.toString();else{var i=[];s.forEach(t,function(e,t){null!=e&&(s.isArray(e)?t+="[]":e=[e],s.forEach(e,function(e){s.isDate(e)?e=e.toISOString():s.isObject(e)&&(e=JSON.stringify(e)),i.push(n(t)+"="+n(e))}))}),o=i.join("&")}return o&&(e+=(-1===e.indexOf("?")?"?":"&")+o),e}},{"./../utils":26}],19:[function(e,t,r){"use strict";t.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},{}],20:[function(e,t,r){"use strict";var s=e("./../utils");t.exports=s.isStandardBrowserEnv()?{write:function(e,t,r,n,o,i){var a=[];a.push(e+"="+encodeURIComponent(t)),s.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),s.isString(n)&&a.push("path="+n),s.isString(o)&&a.push("domain="+o),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},{"./../utils":26}],21:[function(e,t,r){"use strict";t.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},{}],22:[function(e,t,r){"use strict";var s=e("./../utils");t.exports=s.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function n(e){var s=e;return t&&(r.setAttribute("href",s),s=r.href),r.setAttribute("href",s),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=n(window.location.href),function(t){var r=s.isString(t)?n(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},{"./../utils":26}],23:[function(e,t,r){"use strict";var s=e("../utils");t.exports=function(e,t){s.forEach(e,function(r,s){s!==t&&s.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[s])})}},{"../utils":26}],24:[function(e,t,r){"use strict";var s=e("./../utils"),n=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];t.exports=function(e){var t,r,o,i={};return e?(s.forEach(e.split("\n"),function(e){if(o=e.indexOf(":"),t=s.trim(e.substr(0,o)).toLowerCase(),r=s.trim(e.substr(o+1)),t){if(i[t]&&n.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([r]):i[t]?i[t]+", "+r:r}}),i):i}},{"./../utils":26}],25:[function(e,t,r){"use strict";t.exports=function(e){return function(t){return e.apply(null,t)}}},{}],26:[function(e,t,r){"use strict";var s=e("./helpers/bind"),n=e("is-buffer"),o=Object.prototype.toString;function i(e){return"[object Array]"===o.call(e)}function a(e){return null!==e&&"object"==typeof e}function c(e){return"[object Function]"===o.call(e)}function u(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.call(null,e[n],n,e)}t.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:n,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:c,isStream:function(e){return a(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function e(){var t={};function r(r,s){"object"==typeof t[s]&&"object"==typeof r?t[s]=e(t[s],r):t[s]=r}for(var s=0,n=arguments.length;s<n;s++)u(arguments[s],r);return t},extend:function(e,t,r){return u(t,function(t,n){e[n]=r&&"function"==typeof t?s(t,r):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},{"./helpers/bind":17,"is-buffer":27}],27:[function(e,t,r){t.exports=function(e){return null!=e&&null!=e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}},{}],28:[function(e,t,r){var s,n,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function c(e){if(s===setTimeout)return setTimeout(e,0);if((s===i||!s)&&setTimeout)return s=setTimeout,setTimeout(e,0);try{return s(e,0)}catch(t){try{return s.call(null,e,0)}catch(t){return s.call(this,e,0)}}}!function(){try{s="function"==typeof setTimeout?setTimeout:i}catch(e){s=i}try{n="function"==typeof clearTimeout?clearTimeout:a}catch(e){n=a}}();var u,l=[],h=!1,f=-1;function p(){h&&u&&(h=!1,u.length?l=u.concat(l):f=-1,l.length&&d())}function d(){if(!h){var e=c(p);h=!0;for(var t=l.length;t;){for(u=l,l=[];++f<t;)u&&u[f].run();f=-1,t=l.length}u=null,h=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===a||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function g(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];l.push(new m(e,t)),1!==l.length||h||c(d)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=g,o.addListener=g,o.once=g,o.off=g,o.removeListener=g,o.removeAllListeners=g,o.emit=g,o.prependListener=g,o.prependOnceListener=g,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},{}]},{},[2]);