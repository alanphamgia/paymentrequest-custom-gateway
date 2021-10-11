

// import axios from 'axios'

// export default async (req, res) => {

//   // TODO: Validate the request was approved by your payment gateway (in this case Google Pay)

//   // Parse the gateway payment info to match Snipcart's schema
//   // This will change depending on the payment gateway you choose
//   const paymentSessionId = req.query.sessionId
//   const data = {
//     paymentSessionId,
//     state: 'processed',
//     transactionId: req.body.requestId,
//     instructions: 'Your payment will appear on your statement in the coming days',
//     links: {
//       refunds: `${process.env.CHECKOUT_URL}/api/refund?transactionId=${req.body.requestId}`
//     },
//   }

//   // Add authentification
//   // This is the secret API key created in Snipcart's merchant dashboard
//   const options = {
//     headers: {
//       Authorization: `Bearer ${process.env.BEARER_TOKEN}`
//     }
//   }

//   try{
//     // Confirm payment with Snipcart
//     const resp = await axios.post(`${process.env.PAYMENT_URL}/api/private/custom-payment-gateway/payment`,data, options)

//     // ReturnUrl will redirect the user to the Order confirmation page of Snipcart
//     return res.json({
//       returnUrl: resp.data.returnUrl
//     })
//   }catch(e){
//     console.error(e)
//   }

//   return res.status(500).send()
// }


import { Context, Callback, APIGatewayEvent } from "aws-lambda";
import fetch from 'node-fetch';
import uuid from 'uuid';

// if (!process.env.PRODUCTION) {
//   process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0' // For local development
// }

exports.handler = async function (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback) {
  interface ConfirmResult {
    returnUrl: string;
  }

  const requestBody = JSON.parse(event.body);
  const paymentId = uuid();

  const API_URL = process.env.API_URL || 'https://localhost:12666';
  const SITE_URL = process.env.URL || event.headers.origin;

  const response = await fetch(
    `https://payment.snipcart.com/api/private/custom-payment-gateway/payment`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      paymentSessionId: requestBody.paymentSessionId,
      state: requestBody.state,
      error: requestBody.error,
      transactionId: paymentId,
      instructions: 'Your payment will appear on your statement in the coming days',
    }),
  });

  if (response.ok) {
    const body = (await response.json()) as ConfirmResult;

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, returnUrl: body.returnUrl })
    };
  }
}