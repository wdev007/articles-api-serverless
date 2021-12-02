import { v4 } from "uuid";
import { IArticle } from "src/shared/types/IArticle";
import { IRepository } from "src/shared/types/IRepository";
// import ConnectionDynamoDb from "../../shared/database/connection";

class ArticleRepository implements IRepository {
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

  async update(params: any, payload: any) {
    console.log(params, payload);
    
  }

  async delete(params: any) {
    console.log(params);
  }
}

export default new ArticleRepository;