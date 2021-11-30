import { IArticle } from "./IArticle";

export interface IRepository {
  create(title: any): Promise<IArticle>;
  findAll(): Promise<IArticle[]>;
  find(id: string): Promise<IArticle | undefined>;
  update(id: string, payload: any): Promise<IArticle | undefined>;
  delete(id: string): Promise<IArticle | undefined>;
}