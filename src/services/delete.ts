import { StatusCode } from "../shared/http/enums/statusCode";
import { IHttpResponse } from "../shared/types/IHttpResponse";
import { IRepository } from "../shared/types/IRepository";

class DeleteService {
  constructor(
    private readonly http: IHttpResponse,
    private readonly repository: IRepository
  ) {}

  run = async () => {

    return this.http.send({
      status: StatusCode.NO_CONTEN,
      body: ""
    });
  }
}

export default DeleteService;
