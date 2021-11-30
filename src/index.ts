import HttpResponse from "./shared/http/responses";
import repository from "./shared/database/repositories/localRepository";

import CreateService from "./services/create";
import DeleteService from "./services/delete";
import GetService from "./services/get";
import GetAllService from "./services/getAll";
import UpdateService from "./services/update";

const httpResponse = new HttpResponse();

// const repository = new LocalRepository();
repository.findAll().then(res => {
  console.log('findAll: ', res);
})
const createService = new CreateService(httpResponse, repository);
const getService = new GetService(httpResponse, repository);
const getAllService = new GetAllService(httpResponse, repository);
const updateService = new UpdateService(httpResponse, repository);
const deletesService = new DeleteService(httpResponse, repository);

export const create = createService.run;
export const get = getService.run;
export const getAll = getAllService.run;
export const update = updateService.run;
export const exclude = deletesService.run;

