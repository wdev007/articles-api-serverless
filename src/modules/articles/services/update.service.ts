import { APIGatewayProxyHandler } from "aws-lambda";

import AppError from "../../../shared/errors/app-error";

import { StatusCode } from "../../../shared/http/enums/statusCode";
import { IHttpResponse } from "../../../shared/types/IHttpResponse";
import { IRepository } from "../../../shared/types/IRepository";

class UpdateService {
  constructor(
    private readonly http: IHttpResponse,
    private readonly repository: IRepository
  ) {}

  handler: APIGatewayProxyHandler = async (event) => {
    try {
      const { id } = event.pathParameters;

      const body =
        typeof event.body === "string" ? JSON.parse(event.body) : event.body;

      const { title } = body;

      const article = await this.repository.find(id);

      if (!article) {
        throw new AppError(StatusCode.BAD_REQUEST, 'Article does not exists');
      }

      await this.repository.saveInHistory(article);

      await this.repository.update(id, { title });

      return this.http.send({
        status: StatusCode.NO_CONTEN,
        body: "",
      });
    } catch (error) {
      console.error("ERRO IN CREATE: ", error);

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

export default UpdateService;
