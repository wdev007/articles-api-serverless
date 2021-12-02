import HttpResponse from "./shared/http/responses";
import repository from "./shared/database/repositories/localRepository";

import CreateService from "./modules/articles/services/create.service";
import DeleteService from "./modules/articles/services/delete.service";
import GetService from "./modules/articles/services/get.service";
import GetAllService from "./modules/articles/services/getAll.service";
import UpdateService from "./modules/articles/services/update.service";

const httpResponse = new HttpResponse();

const createService = new CreateService(httpResponse, repository);
const getService = new GetService(httpResponse, repository);
const getAllService = new GetAllService(httpResponse, repository);
const updateService = new UpdateService(httpResponse);
const deletesService = new DeleteService(httpResponse);

export const create = createService.run;
export const get = getService.run;
export const getAll = getAllService.run;
export const update = updateService.run;
export const exclude = deletesService.run;

