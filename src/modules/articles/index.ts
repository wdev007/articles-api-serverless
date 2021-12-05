import HttpResponse from "../../shared/http/responses";
import repository from "../../shared/database/repositories/dynamodb.repository";

import CreateService from "./services/create.service";
import DeleteService from "./services/delete.service";
import GetService from "./services/get.service";
import GetAllService from "./services/getAll.service";
import UpdateService from "./services/update.service";

import GetAllHistoryService from "./services/getAllHistory.service";

const httpResponse = new HttpResponse();

const createService = new CreateService(httpResponse, repository);
const getService = new GetService(httpResponse, repository);
const getAllService = new GetAllService(httpResponse, repository);
const updateService = new UpdateService(httpResponse, repository);
const deletesService = new DeleteService(httpResponse, repository);

const getAllHistoryService = new GetAllHistoryService(httpResponse, repository);

export const create = createService.handler;
export const get = getService.handler;
export const getAll = getAllService.handler;
export const update = updateService.handler;
export const exclude = deletesService.handler;

export const getAllHistory = getAllHistoryService.handler;

