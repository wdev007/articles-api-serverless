interface IResponse {
  statusCode: number;
  body: string;
}

interface IParams {
  status: number;
  body: any;
}

export interface IHttpResponse {
  send(params: IParams): Promise<IResponse>
}