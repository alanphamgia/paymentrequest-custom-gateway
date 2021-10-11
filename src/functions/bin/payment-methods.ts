
import { Context, Callback, APIGatewayEvent } from "aws-lambda";
import fetch from "node-fetch";


// if (!process.env.PRODUCTION) {
//   process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0' // For local development
// }

exports.handler = async function (event: APIGatewayEvent, context: Context, callback: Callback) {
  // Get request's body
  const request = JSON.parse(event.body);
  console.log("request");
  console.log(request);
  const API_URL = process.env.API_URL || 'https://localhost:12666';
  const SITE_URL = process.env.URL || 'http://localhost:3000';

  // Validate that the request is coming from Snipcart
  const response = await fetch(`https://payment.snipcart.com/api/public/custom-payment-gateway/validate?publicToken=${request.publicToken}`)

  // Return 404 if the request is not from Snipcart
  if (!response.ok) return {
    statusCode: 404,
    body: ""
  }

  let localbankURLLink = await generateURl('VNBANK',request);
  let InternationalbankURLLink = await generateURl('INTCARD',request);

  var URljson =
    [{
      id: 'local-bank',
      name: 'Thanh Toán Ngân Hàng Nội Địa',
      checkoutUrl: localbankURLLink,
    },
    {
      id: 'international-bank',
      name: 'Thanh Toán Quốc Tế',
      checkoutUrl: InternationalbankURLLink,
    }]


  // Create payment method list
  return {
    statusCode: 200,
    body: JSON.stringify(URljson),
    localbankURLLink,
    InternationalbankURLLink
  }

async function generateURl(bankcode,request)
{
  let IPresponse = await fetch('http://ip-api.com/json');
  let data = await IPresponse.text();
  const readdata = JSON.parse(data);
  var ipAddr = readdata.query;

  var tmnCode = process.env.vnp_TmnCode;
  var secretKey = process.env.vnp_HashSecret;
  var vnpUrl = process.env.vnp_Url;
  var returnUrl = 'https://blissful-bose-c44299.netlify.app/confirm-payment.html';
  //var vnp_IpnUrl = 'https://secure-whiteplan.netlify.app/.netlify/functions/confirm-payment';
  //process.env.SITE_URL + '#/order/' + request.invoice.targetId;
  console.log("returnUrl" + returnUrl);

  var date = new Date();
  var mm = date.getMonth() + 1;
  var dd = date.getDate();
  var yy = date.getFullYear();
  var HH = date.getHours();
  var mmi = date.getMinutes();
  var ss = date.getSeconds();
  var datestring = String(yy) + String(mm).padStart(2, '0') + String(dd).padStart(2, '0') + String(HH).padStart(2, '0') + String(mmi).padStart(2, '0') + String(ss).padStart(2, '0');

  var createDate = datestring;
  var orderId = request.invoice.targetId;
  var amount = request.invoice.amount;
  var bankCode = bankcode;

  var orderInfo = 'test';
  //var orderType = request.body.orderType;
  var locale = request.invoice.language;
  if(locale === null || locale === ''){
      locale = 'vn';
  }
  else
  {
      locale = 'en';
  }

  var currCode = 'VND';
  var vnp_Params = {};
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

  if(bankCode !== null && bankCode !== ''){
      vnp_Params['vnp_BankCode'] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var querystring = require('qs');
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
  vnp_Params['vnp_SecureHash'] = signed;
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
  console.log("vnpUrl: " + vnpUrl);
  return vnpUrl;
}

function sortObject(obj)
{
  var sorted = {};
  var str = [];
  var key;
  for (key in obj){
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
}