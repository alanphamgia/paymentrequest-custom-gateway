import axios from 'axios'
import { APIGatewayEvent, Context, Callback } from "aws-lambda";

exports.handler = async function ( event: APIGatewayEvent, context: Context, callback: Callback)  {

  const requestBody = JSON.parse(event.body);
  console.log(event);
  try {
    const {publicToken} = requestBody.query;
    const resp = await axios.get(`https://payment.snipcart.com/api/public/custom-payment-gateway/payment-session?publicToken=${publicToken}`)
    // console.log(resp);
    return {
      body: JSON.stringify(resp)
    }
  } catch (e) {
    console.error(e)
    return {
      statusCode: 500,
    }
  }
}