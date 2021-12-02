import HttpResponse from "../../shared/http/responses";
import repository from "./article.repository";

import CreateService from "./services/create.service";
import DeleteService from "./services/delete.service";
import GetService from "./services/get.service";
import GetAllService from "./services/getAll.service";
import UpdateService from "./services/update.service";

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
