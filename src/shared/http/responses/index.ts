import { IHttpResponse } from "../../types/IHttpResponse";

class HttpResponse implements IHttpResponse {
  async send({ status, body }) {
    console.log('body: ', body);
    return {
      statusCode: status,
      body: JSON.stringify(body)
    }
  }
}

export default HttpResponse;