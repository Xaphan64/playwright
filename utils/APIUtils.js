const { request } = require("@playwright/test");

class APIUtils {
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }

  async getToken() {
    // await the post first
    const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
      data: this.loginPayLoad,
    });

    const loginResponseJsaon = await loginResponse.json();

    // give value to the token
    const token = loginResponseJsaon.token;
    return token;
  }

  async createOrder(orderPayLoad) {
    const response = {};
    response.token = await this.getToken();

    // precondition - create order trough API
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayLoad,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      },
    );

    const orderResponseJson = await orderResponse.json();

    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;

    return response;
  }
}

module.exports = { APIUtils };
