import CreateService from "./create.service";

import HttpResponse from "../../../shared/http/responses";

import { IRepository } from "../../../shared/types";

const httpResponse = new HttpResponse();

describe('CreateService', () => {
  it('should be able create a article', async () => {
    const repository: IRepository = {
      create: jest.fn().mockResolvedValue({ title: '' }),
      delete: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn(),
      findAllHisotry: jest.fn(),
      findByTitle: jest.fn(),
      saveInHistory: jest.fn(),
      update: jest.fn()
    }

    const createService = new CreateService(httpResponse, repository);

    const event = {
      body: { title: '' },
      httpMethod: 'POST',
    } as any

    const response: any = await createService.handler(event, {} as any, () => {});

    expect(response.statusCode).toEqual(201);
  });
});