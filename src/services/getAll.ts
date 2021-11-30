import { IHttpResponse } from "../shared/types/IHttpResponse";
import { IRepository } from "../shared/types/IRepository";

class GetAllService {
  constructor(public http: IHttpResponse, private repository: IRepository) {}

  run = async () => {
    return this.http.send();
  };
}

export default GetAllService;
