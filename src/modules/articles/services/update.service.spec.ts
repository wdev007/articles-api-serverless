import UpdateService from "./update.service";

import HttpResponse from "../../../shared/http/responses";
import { IRepository } from "../../../shared/types";

const httpResponse = new HttpResponse();

describe('UpdateService', () => {
  it('should be able update article', async () => {
    const id = '61be7ef3-baa4-4a6c-992d-3a4ec9f11328';
    const repository: IRepository = {
      create: jest.fn(),
      delete: jest.fn().mockResolvedValue({}),
      find: jest.fn().mockResolvedValue({ title: 'Artigo 1', id }),
      findAll: jest.fn(),
      findAllHisotry: jest.fn(),
      findByTitle: jest.fn(),
      saveInHistory: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({})
    }

    const updateService = new UpdateService(httpResponse, repository);

    const event = {
      pathParameters: { id },
      body: { title: 'Novo titulo' },
      httpMethod: 'PATCH',
    } as any

    const response: any = await updateService.handler(event, {} as any, () => {});

    expect(response.statusCode).toEqual(204);
  });
});