import { IArticle } from "./IArticle";

export interface IRepository {
  create(params: any): Promise<IArticle>;
  findAll(): Promise<IArticle[]>;
  findAllHisotry(): Promise<IArticle[]>;
  find(params: any): Promise<IArticle | undefined>;
  update(params: any, payload: any): Promise<void>;
  delete(params: any): Promise<void>;
  findByTitle(title: string): Promise<IArticle | undefined>;
  saveInHistory(item: any): Promise<void>;
}