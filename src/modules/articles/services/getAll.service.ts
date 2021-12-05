import { APIGatewayProxyHandler } from "aws-lambda";

import { StatusCode } from "../../../shared/http/enums/statusCode";
import AppError from "../../../shared/errors/app-error";

import { IHttpResponse, IRepository } from "../../../shared/types";

class GetAllService {
  constructor(public http: IHttpResponse, private repository: IRepository) {}

  handler: APIGatewayProxyHandler = async () => {
    try {
      const articles = await this.repository.findAll();

      return this.http.send({
        status: StatusCode.OK,
        body: articles,
      });
    } catch (error) {
      console.error("ERRO IN GETALL: ", error);

      if (error instanceof AppError) {
        return this.http.send({
          status: error.getStatus(),
          body: error.getBody(),
        });
      }

      return this.http.send({
        status: StatusCode.ERROR,
        body: "Ocorreu um erro inesperado!",
      });
    }
  };
}

export default GetAllService;
