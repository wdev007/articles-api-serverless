import { IHttpResponse } from "../shared/types/IHttpResponse";
import { IRepository } from "../shared/types/IRepository";

class UpdateService {
  constructor(
    private readonly http: IHttpResponse,
    private readonly repository: IRepository
  ) {}

  run = async () => {
    return this.http.send();
  }
}

export default UpdateService;
