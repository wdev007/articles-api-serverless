export interface IRepository {
  create(data: any): Promise<void>;
}