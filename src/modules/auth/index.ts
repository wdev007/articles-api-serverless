import HttpResponse from "../../shared/http/responses";

import BasicAuthService from "./services/basic-auth.service";
import JwtAuthService from "./services/jwt-auth.service";
import SignIn from './services/sign-in.service';

const basicAuth = BasicAuthService.handler;
const jwtAuth = JwtAuthService.handler;
const signIn = new SignIn(new HttpResponse()).handler;

export {
  basicAuth,
  jwtAuth,
  signIn
}