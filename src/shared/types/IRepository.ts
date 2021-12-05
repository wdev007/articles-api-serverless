import { IArticle } from "./IArticle";

export interface IRepository {
  create(params: IArticle): Promise<IArticle>;
  findAll(): Promise<IArticle[]>;
  findAllHisotry(id: string): Promise<IArticle[]>;
  find(id: string): Promise<IArticle | undefined>;
  update(id: string, payload: IArticle): Promise<void>;
  delete(id: string): Promise<void>;
  findByTitle(title: string): Promise<IArticle | undefined>;
  saveInHistory(item: IArticle): Promise<void>;
}