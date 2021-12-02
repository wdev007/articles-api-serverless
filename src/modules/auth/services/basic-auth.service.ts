import { Callback } from "aws-lambda";

import AwsPolicyGeneratorService from "./aws-policy-generator.service";

class BasicAuthService {
  handler = async (event: any, _, callback: Callback) => {
    const token = event.authorizationToken.toLowerCase();
    const methodArn = event.methodArn;

    switch (token) {
        case 'allow':
            callback(null, AwsPolicyGeneratorService.generate('user', 'Allow', methodArn));
            break;
        case 'deny':
            callback(null, AwsPolicyGeneratorService.generate('user', 'Deny', methodArn));
            break;
        case 'unauthorized':
            callback("Unauthorized");   // Return a 401 Unauthorized response
            break;
        default:
            callback("Error: Invalid token"); // Return a 500 Invalid token response
    }
  }
}

export default BasicAuthService;