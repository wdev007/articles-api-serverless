import { APIGatewayProxyHandler } from "aws-lambda";
import { StatusCode } from "../../../shared/http/enums/statusCode";
import { IHttpResponse } from "../../../shared/types/IHttpResponse";
import { IRepository } from "../../../shared/types/IRepository";

class GetAllService {
  constructor(public http: IHttpResponse, private repository: IRepository) {}

  run: APIGatewayProxyHandler = async () => {
    const articles = await this.repository.findAll();

    return this.http.send({
      status: StatusCode.OK,
      body: articles
    });
  };
}

export default GetAllService;
