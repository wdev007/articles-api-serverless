import { APIGatewayProxyHandler } from "aws-lambda";

import { StatusCode } from "../../../shared/http/enums/statusCode";
import { IHttpResponse, IRepository } from "../../../shared/types";

import AppError from "../../../shared/errors/app-error";

class GetService {
  constructor(
    private readonly http: IHttpResponse,
    private readonly repository: IRepository
  ) {}

  handler: APIGatewayProxyHandler = async (event) => {
    try {
      const { id } = event.pathParameters as any;

      const article = await this.repository.find(id);

      return this.http.send({
        status: StatusCode.OK,
        body: article,
      });
    } catch (error) {
      console.error("ERRO IN GET: ", error);

      if (error instanceof AppError) {
        return this.http.send({
          status: error.getStatus(),
          body: error.message,
        });
      }

      return this.http.send({
        status: StatusCode.ERROR,
        body: "Ocorreu um erro inesperado!",
      });
    }
  };
}

export default GetService;
