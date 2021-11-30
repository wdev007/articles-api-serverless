import { APIGatewayProxyHandler } from 'aws-lambda'
import { StatusCode } from '../shared/http/enums/statusCode';
import { IHttpResponse } from "../shared/types/IHttpResponse";
import { IRepository } from "../shared/types/IRepository";

class CreateService {
  constructor(
    private readonly http: IHttpResponse,
    private readonly repository: IRepository
  ) {}

  run: APIGatewayProxyHandler = async (event) => {
    const  body =  typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { title } = body;
    
    const article = await this.repository.create(title);
    
    return this.http.send({
      status: StatusCode.CREATED,
      body: article
    });
  }
}

export default CreateService;
