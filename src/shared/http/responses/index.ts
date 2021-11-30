import { IHttpResponse } from "../../types/IHttpResponse";

class HttpResponse implements IHttpResponse {
  async send() {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
        // input: event,
      }, null, 2)
    }
  }
}

export default HttpResponse;