import jwt, { VerifyOptions } from "jsonwebtoken";
import { APIGatewayAuthorizerEvent, PolicyDocument } from "aws-lambda";
import { IPayload } from "src/shared/types/IPayload";
import { IDecode } from "src/shared/types/IDecode";

class AuthService {
  constructor() {}

  getPolicyDocument = (effect: string, resource: string): PolicyDocument => {
    return {
      Version: "2012-10-17", // default version
      Statement: [
        {
          Action: "execute-api:Invoke", // default action
          Effect: effect,
          Resource: resource,
        },
      ],
    };
  };

  _getToken = (event: APIGatewayAuthorizerEvent): string => {
    if (!event.type || event.type !== "TOKEN") {
      throw new Error('Expected "event.type" parameter to have value "TOKEN"');
    }

    const tokenString = event.authorizationToken;
    if (!tokenString) {
      throw new Error(
        'Expected "event.authorizationToken" parameter to be set'
      );
    }

    const match = tokenString.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new Error(
        `Invalid Authorization token - ${tokenString} does not match "Bearer .*"`
      );
    }
    return match[1];
  };

  authenticate = async (event: APIGatewayAuthorizerEvent) => {
    const token = this._getToken(event);
    const decoded = jwt.decode(token, { complete: true }) as IDecode;

    if (!decoded || !decoded.header || !decoded.header.kid) {
      throw new Error("invalid token");
    }
    const options = {
      algorithms: ["RS256"],
    } as VerifyOptions;

    const decodedResponse = jwt.verify(
      token,
      "mysecretjwt",
      options
    ) as IPayload;

    return {
      principalId: decodedResponse?.sub,
      policyDocument: this.getPolicyDocument("Allow", event.methodArn),
      context: { scope: decodedResponse.scope },
    };
  };
}

export default AuthService;
