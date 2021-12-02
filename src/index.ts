import HttpResponse from "./shared/http/responses";
import DynamoDBRepository from "./shared/database/repositories/dynamodb.repository";

import CreateService from "./modules/articles/services/create.service";
import DeleteService from "./modules/articles/services/delete.service";
import GetService from "./modules/articles/services/get.service";
import GetAllService from "./modules/articles/services/getAll.service";
import UpdateService from "./modules/articles/services/update.service";

const httpResponse = new HttpResponse();

const repository = new DynamoDBRepository();

const createService = new CreateService(httpResponse, repository);
const getService = new GetService(httpResponse, repository);
const getAllService = new GetAllService(httpResponse, repository);
const updateService = new UpdateService(httpResponse);
const deletesService = new DeleteService(httpResponse);

export const create = createService.handler;
export const get = getService.handler;
export const getAll = getAllService.handler;
export const update = updateService.handler;
export const exclude = deletesService.handler;
