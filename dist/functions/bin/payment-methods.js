// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({2:[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:case 1:
                    t = op;break;
                case 4:
                    _.label++;return { value: op[1], done: false };
                case 5:
                    _.label++;y = op[1];op = [0];continue;
                case 7:
                    op = _.ops.pop();_.trys.pop();continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];t = op;break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];_.ops.push(op);break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
if (!process.env.PRODUCTION) {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // For local development
}
exports.handler = function (event, context, callback) {
    return __awaiter(this, void 0, void 0, function () {
        function generateURl(bankcode, request) {
            return __awaiter(this, void 0, void 0, function () {
                var IPresponse, data, readdata, ipAddr, tmnCode, secretKey, vnpUrl, returnUrl, date, mm, dd, yy, HH, mmi, ss, datestring, createDate, orderId, amount, bankCode, orderInfo, locale, currCode, vnp_Params, querystring, signData, crypto, hmac, signed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, node_fetch_1.default('http://ip-api.com/json')];
                        case 1:
                            IPresponse = _a.sent();
                            return [4 /*yield*/, IPresponse.text()];
                        case 2:
                            data = _a.sent();
                            readdata = JSON.parse(data);
                            ipAddr = readdata.query;
                            tmnCode = process.env.vnp_TmnCode;
                            secretKey = process.env.vnp_HashSecret;
                            vnpUrl = process.env.vnp_Url;
                            returnUrl = 'http://localhost:1234/index.html';
                            //var vnp_IpnUrl = 'https://secure-whiteplan.netlify.app/.netlify/functions/confirm-payment';
                            //process.env.SITE_URL + '#/order/' + request.invoice.targetId;
                            console.log("returnUrl" + returnUrl);
                            date = new Date();
                            mm = date.getMonth() + 1;
                            dd = date.getDate();
                            yy = date.getFullYear();
                            HH = date.getHours();
                            mmi = date.getMinutes();
                            ss = date.getSeconds();
                            datestring = String(yy) + String(mm).padStart(2, '0') + String(dd).padStart(2, '0') + String(HH).padStart(2, '0') + String(mmi).padStart(2, '0') + String(ss).padStart(2, '0');
                            createDate = datestring;
                            orderId = request.invoice.targetId;
                            amount = request.invoice.amount;
                            bankCode = bankcode;
                            orderInfo = 'test';
                            locale = request.invoice.language;
                            if (locale === null || locale === '') {
                                locale = 'vn';
                            } else {
                                locale = 'en';
                            }
                            currCode = 'VND';
                            vnp_Params = {};
                            vnp_Params['vnp_Version'] = '2.1.0';
                            vnp_Params['vnp_Command'] = 'pay';
                            vnp_Params['vnp_TmnCode'] = tmnCode;
                            // vnp_Params['vnp_Merchant'] = ''
                            vnp_Params['vnp_Locale'] = locale;
                            vnp_Params['vnp_CurrCode'] = currCode;
                            vnp_Params['vnp_TxnRef'] = orderId;
                            vnp_Params['vnp_OrderInfo'] = orderInfo;
                            vnp_Params['vnp_OrderType'] = 'other';
                            vnp_Params['vnp_Amount'] = amount * 100;
                            vnp_Params['vnp_ReturnUrl'] = returnUrl;
                            vnp_Params['vnp_IpAddr'] = ipAddr;
                            vnp_Params['vnp_CreateDate'] = createDate;
                            //vnp_Params['vnp_IpnUrl'] = vnp_IpnUrl;
                            if (bankCode !== null && bankCode !== '') {
                                vnp_Params['vnp_BankCode'] = bankCode;
                            }
                            vnp_Params = sortObject(vnp_Params);
                            querystring = require('qs');
                            signData = querystring.stringify(vnp_Params, { encode: false });
                            crypto = require("crypto");
                            hmac = crypto.createHmac("sha512", secretKey);
                            signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
                            vnp_Params['vnp_SecureHash'] = signed;
                            vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
                            console.log("vnpUrl: " + vnpUrl);
                            return [2 /*return*/, vnpUrl];
                    }
                });
            });
        }
        function sortObject(obj) {
            var sorted = {};
            var str = [];
            var key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    str.push(encodeURIComponent(key));
                }
            }
            str.sort();
            for (key = 0; key < str.length; key++) {
                sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
            }
            return sorted;
        }
        var request, API_URL, SITE_URL, response, localbankURLLink, InternationalbankURLLink, URljson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request = JSON.parse(event.body);
                    API_URL = process.env.API_URL || 'https://localhost:12666';
                    SITE_URL = process.env.URL || 'http://localhost:3000';
                    return [4 /*yield*/, node_fetch_1.default(API_URL + "/api/public/custom-payment-gateway/validate?publicToken=" + request.PublicToken)
                    // Return 404 if the request is not from Snipcart
                    ];
                case 1:
                    response = _a.sent();
                    // Return 404 if the request is not from Snipcart
                    if (!response.ok) return [2 /*return*/, {
                        statusCode: 404,
                        body: ""
                    }];
                    return [4 /*yield*/, generateURl('VNBANK', request)];
                case 2:
                    localbankURLLink = _a.sent();
                    return [4 /*yield*/, generateURl('INTCARD', request)];
                case 3:
                    InternationalbankURLLink = _a.sent();
                    URljson = [{
                        id: 'local-bank',
                        name: 'Thanh Toán Ngân Hàng Nội Địa',
                        checkoutUrl: localbankURLLink
                    }, {
                        id: 'international-bank',
                        name: 'Thanh Toán Quốc Tế',
                        checkoutUrl: InternationalbankURLLink
                    }];
                    // Create payment method list
                    return [2 /*return*/, {
                        statusCode: 200,
                        body: JSON.stringify(URljson),
                        localbankURLLink: localbankURLLink,
                        InternationalbankURLLink: InternationalbankURLLink
                    }];
            }
        });
    });
};
},{}]},{},[2], null)
//# sourceMappingURL=/payment-methods.map