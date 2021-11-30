interface IResponse {
  statusCode: number;
  body: string;
}

export interface IHttpResponse {
  send(): Promise<IResponse>
}