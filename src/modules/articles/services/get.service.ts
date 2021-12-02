import { APIGatewayProxyHandler } from "aws-lambda";
import { StatusCode } from "../../../shared/http/enums/statusCode";
import { IHttpResponse } from "../../../shared/types/IHttpResponse";
import { IRepository } from "../../../shared/types/IRepository";

class GetService {
  constructor(
    private readonly http: IHttpResponse,
    private readonly repository: IRepository
  ) {}

  handler: APIGatewayProxyHandler = async (event) => {
    const { id } = event.pathParameters as any;

    const article = await this.repository.find(id);

    return this.http.send({
      status: StatusCode.OK,
      body: article,
    });
  };
}

export default GetService;
