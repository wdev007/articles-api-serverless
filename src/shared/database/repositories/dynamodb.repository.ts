import * as AWS from "aws-sdk";
import { GetItemInput } from "aws-sdk/clients/dynamodb";
import { v4 } from 'uuid';

import HttpResponse from "../../http/responses";
import { IArticle } from "../../types/IArticle";
import { IConfigAws } from "../../types/IConfigAws";
import { IRepository } from "../../types/IRepository";

type PutItem = AWS.DynamoDB.DocumentClient.PutItemInput;
type QueryItem = AWS.DynamoDB.DocumentClient.QueryInput;
type UpdateItem = AWS.DynamoDB.DocumentClient.UpdateItemInput;
type DeleteItem = AWS.DynamoDB.DocumentClient.DeleteItemInput;

const config: IConfigAws = { region: "us-east-1" };

AWS.config.update(config);

const documentClient = new AWS.DynamoDB.DocumentClient();

class DynamoDBRepository implements IRepository {
  private client: AWS.DynamoDB.DocumentClient;

  constructor(client = documentClient) {
    this.client = client;
  }

  create = async (title: string): Promise<IArticle> => {
    try {
      const params: PutItem = {
        TableName: process.env.TABLE_NAME,
        Item: {
          id: v4(),
          title,
        }
      }

      await this.client.put(params).promise();

      return params.Item as IArticle;
    } catch (error) {
      console.log('error: ', error);
      
      throw new HttpResponse().send({
        status: 500,
        body: error
      });
    }
  };

  find = async (id: string): Promise<IArticle> => {
    try {
      const params: GetItemInput = {
        TableName: process.env.TABLE_NAME,
        Key: {
          id: {
            S: id
          }
        }
      }

      const data = await this.client.get(params).promise();

      return data.Item as IArticle;

    } catch (error) {
      console.log('error: ', error);
      
      throw new HttpResponse().send({
        status: 500,
        body: error
      });
    }
  };

  findAll = async (): Promise<IArticle[]> => {
    try {
      const params: QueryItem = {
        TableName: 'articles-table'
      }
      const data = await this.client.scan(params).promise();
      
      return data.Items as IArticle[];
    } catch (error) {
      console.log('error: ', error);
      throw new HttpResponse().send({
        status: 500,
        body: error
      });
    }
  };

  delete = async (params: DeleteItem) => {
    console.log('params: ', params);
  };

  update = async (params: UpdateItem) => {
    console.log('params: ', params);
  };

  private async saveInHistory(item: any): Promise<void> {
    try {
      const params: PutItem = {
        TableName: process.env.HISTORY_TABLE_NAME,
        Item: {
          ...item,
          article_id: item.id,
          id: v4(),
        }
      }

      await this.client.put(params).promise();

    } catch (error) {
      console.log('error: ', error);
      
      throw new HttpResponse().send({
        status: 500,
        body: error
      });
    }
  }
}

export default new DynamoDBRepository;
