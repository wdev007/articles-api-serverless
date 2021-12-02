import { JwtHeader } from "jsonwebtoken";
import { IPayload } from "./IPayload";

export interface IDecode {
  header: JwtHeader,
  payload: IPayload,
  signature: string;
}