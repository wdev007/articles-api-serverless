import { APIGatewayProxyHandler } from "aws-lambda";

import { StatusCode } from "../../../shared/http/enums/statusCode";
import AppError from "../../../shared/errors/app-error";

import { IHttpResponse, IRepository } from "../../../shared/types";

class CreateService {
  constructor(
    private readonly http: IHttpResponse,
    private readonly repository: IRepository
  ) {}

  handler: APIGatewayProxyHandler = async (event) => {
    try {
      const body =
        typeof event.body === "string" ? JSON.parse(event.body) : event.body;
      const { title } = body;

      const article = await this.repository.create({ title });

      return this.http.send({
        status: StatusCode.CREATED,
        body: article,
      });
    } catch (error) {
      console.error('ERRO IN CREATE: ', error);

      if (error instanceof AppError) {
        return this.http.send({
          status: error.getStatus(),
          body: error.message,
        });  
      }

      return this.http.send({
        status: StatusCode.ERROR,
        body: 'Ocorreu um erro inesperado!',
      });
    }
  };
}

export default CreateService;
