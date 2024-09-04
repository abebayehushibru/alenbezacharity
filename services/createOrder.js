
import applyFabricToken from './applyFabricTokenService';
import tools from '../utils/tools';
import config from '../config/config';

export const createOrder = async (req, res) => {
  try {
    const { title, amount } = req.body;
    console.log(`Title: ${title}, Amount: ${amount}`);

    // Get the Fabric Token
    const applyFabricTokenResult = await applyFabricToken();
    const fabricToken = applyFabricTokenResult.token;
    console.log('Fabric Token =', fabricToken);

    // Create Order
    const createOrderResult = await requestCreateOrder(fabricToken, title, amount);
    console.log(createOrderResult);

    // Extract prepayId and generate the URL
    const prepayId = createOrderResult.biz_content.prepay_id;
    const rawRequest = createRawRequest(prepayId);
    const checkoutUrl = `${config.webBaseUrl}${rawRequest}&version=1.0&trade_type=Checkout`;

    console.log('Assembled URL:', checkoutUrl);
    res.send(checkoutUrl);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Error creating order');
  }
};

// Function to request order creation
export const requestCreateOrder = async (fabricToken, title, amount) => {
  const reqObject = createRequestObject(title, amount);

  try {
    const options = {
      method: 'POST',
      url: `${config.baseUrl}/payment/v1/merchant/preOrder`,
      headers: {
        'Content-Type': 'application/json',
        'X-APP-Key': config.fabricAppId,
        Authorization: fabricToken,
      },
      data: reqObject,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Ignore SSL certificate errors
    };

    const response = await Axios(options);
    return response.data;
  } catch (error) {
    console.error('Error creating order request:', error.response?.data || error.message);
    throw error; // Rethrow error to handle it in the calling function
  }
};

// Helper functions (unchanged)
function createRequestObject(title, amount) {
  let req = {
    timestamp: tools.createTimeStamp(),
    nonce_str: tools.createNonceStr(),
    method: 'payment.preorder',
    version: '1.0',
  };
  let biz = {
    notify_url: 'https://www.google.com',
    appid: config.merchantAppId,
    merch_code: config.merchantCode,
    merch_order_id: createMerchantOrderId(),
    trade_type: 'Checkout',
    title: title,
    total_amount: amount,
    trans_currency: 'ETB',
    timeout_express: '120m',
    business_type: 'BuyGoods',
    redirect_url: 'https://www.bing.com/',
    callback_info: 'From web',
  };
  req.biz_content = biz;
  req.sign = tools.signRequestObject(req);
  req.sign_type = 'SHA256WithRSA';
  console.log(req);
  return req;
}

function createMerchantOrderId() {
  return new Date().getTime() + '';
}

function createRawRequest(prepayId) {
  let map = {
    appid: config.merchantAppId,
    merch_code: config.merchantCode,
    nonce_str: tools.createNonceStr(),
    prepay_id: prepayId,
    timestamp: tools.createTimeStamp(),
  };
  let sign = tools.signRequestObject(map);
  // Order by ASCII in array
  let rawRequest = [
    `appid=${map.appid}`,
    `merch_code=${map.merch_code}`,
    `nonce_str=${map.nonce_str}`,
    `prepay_id=${map.prepay_id}`,
    `timestamp=${map.timestamp}`,
    `sign=${sign}`,
    'sign_type=SHA256WithRSA',
  ].join('&');
  return rawRequest;
}

export default createOrder;
