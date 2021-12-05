import { APIGatewayAuthorizerEvent, Callback, Context } from "aws-lambda";
import AuthService from "./auth.service";

class JwtAuthService {
  static handler = async (
    event: APIGatewayAuthorizerEvent,
    _context: Context,
    callback: Callback
  ) => {
    const authService = new AuthService();

    try {
      return await authService.authenticate(event);
    } catch (err) {
      callback("Unauthorized"); // Return a 401 Unauthorized response
    }
  };
}

export default JwtAuthService;
