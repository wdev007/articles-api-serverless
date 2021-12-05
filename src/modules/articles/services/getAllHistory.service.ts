import { APIGatewayProxyHandler } from "aws-lambda";

import { StatusCode } from "../../../shared/http/enums/statusCode";
import AppError from "../../../shared/errors/app-error";

import { IHttpResponse, IRepository } from "../../../shared/types";

class GetAllHistoryService {
  constructor(public http: IHttpResponse, private repository: IRepository) {}

  handler: APIGatewayProxyHandler = async (event) => {
    try {
      const { id } = event.pathParameters;

      const articles = await this.repository.findAllHisotry(id);

      return this.http.send({
        status: StatusCode.OK,
        body: articles,
      });
    } catch (error) {
      console.error("ERRO IN GETALLHISTORY: ", error);

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

export default GetAllHistoryService;
