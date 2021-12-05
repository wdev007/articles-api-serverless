import { APIGatewayEvent, Context } from "aws-lambda";
import * as jwt from "jsonwebtoken";

import AppError from "../../../shared/errors/app-error";
import { StatusCode } from "../../../shared/http/enums/statusCode";
import { IHttpResponse } from "../../../shared/types";

class SignInService {
  constructor(private httpResponse: IHttpResponse) {}

  handler = async (event: APIGatewayEvent, _context: Context) => {
    try {
      const secret = 'mysecretjwt'; //TODO: pegar do env

      const body =
        typeof event.body === "string" ? JSON.parse(event.body) : event.body;

      const { username, password } = body;

      if (username !== "wdev007" || password !== "123") {
        throw new AppError(
          StatusCode.BAD_REQUEST,
          "Username or password invalid"
        );
      }

      const token = jwt.sign({ username }, secret, { expiresIn: 60 });

      return this.httpResponse.send({
        status: StatusCode.OK,
        body: {
          access_token: token,
        },
      });
    } catch (error) {
      console.error("ERRO IN SIGNIN: ", error);

      if (error instanceof AppError) {
        return this.httpResponse.send({
          status: error.getStatus(),
          body: error.getBody(),
        });
      }

      return this.httpResponse.send({
        status: StatusCode.ERROR,
        body: "Ocorreu um erro inesperado!",
      });
    }
  };
}

export default SignInService;
