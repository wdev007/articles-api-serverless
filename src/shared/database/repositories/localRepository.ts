import { v4 } from "uuid";
import { IArticle } from "../../types/IArticle";
import { IRepository } from "../../types/IRepository";

class LocalRepository implements IRepository {
  private articles: IArticle[];

  constructor() {
    this.articles = [{ title: "aaaa" }, { title: "dadsa" }];
  }

  create = async (title: string) => {
    const article: IArticle = {
      id: v4(),
      title,
      created_at: new Date().toLocaleString("pt-BR"),
      updated_at: new Date().toLocaleString("pt-BR"),
    };

    this.articles.push(article);

    return article;
  }

  async find(id: string) {
    return this.articles.find(article => article.id === id);
  }

  findAll = async () => {
    return this.articles;
  }

  async update(id: string, payload: any) {
    return this.articles.find(article => article.id === id)
  }

  async delete(id: string) {
    return this.articles.find(article => article.id === id)
  }
}

export default new LocalRepository;
