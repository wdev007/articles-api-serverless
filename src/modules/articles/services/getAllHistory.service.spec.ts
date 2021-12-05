import GetAllHistoryService from "./getAllHistory.service";

import HttpResponse from "../../../shared/http/responses";
import { IRepository } from "../../../shared/types";

const httpResponse = new HttpResponse();

describe('GetAllHistoryService', () => {
  it('should be able get all history articles', async () => {
    const id = '61be7ef3-baa4-4a6c-992d-3a4ec9f11328';
    const repository: IRepository = {
      create: jest.fn(),
      delete: jest.fn().mockResolvedValue({}),
      find: jest.fn().mockResolvedValue({ title: 'Artigo 1', id }),
      findAll: jest.fn(),
      findAllHisotry: jest.fn(),
      findByTitle: jest.fn(),
      saveInHistory: jest.fn(),
      update: jest.fn()
    }

    const getAllHistoryService = new GetAllHistoryService(httpResponse, repository);

    const event = {
      pathParameters: { id },
      httpMethod: 'DELETE',
    } as any

    const response: any = await getAllHistoryService.handler(event, {} as any, () => {});

    expect(response.statusCode).toEqual(200);
  });
});