import * as AWS from "aws-sdk";
import { v4 } from 'uuid';

import { historyTableName, tableName } from "../../constants/dynamodb";

import { IArticle, IConfigAws, IRepository } from "../../types";

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
    const params: PutItem = {
      TableName: tableName,
      Item: {
        id: v4(),
        title,
      }
    }

    await this.client.put(params).promise();

    return params.Item as IArticle;
  };

  find = async (id: string): Promise<IArticle> => {
    const params = {
      TableName: tableName,
      Key: {
        id
      }
    }

    const data = await this.client.get(params).promise();

    return data.Item as IArticle;
  };

  findAll = async (): Promise<IArticle[]> => {
    const params: QueryItem = {
      TableName: tableName
    }
    const data = await this.client.scan(params).promise();
    
    return data.Items as IArticle[];
  };

  findAllHisotry = async (): Promise<IArticle[]> => {
    const params: QueryItem = {
      TableName: historyTableName
    }
    const data = await this.client.scan(params).promise();
    
    return data.Items as IArticle[];
  };

  delete = async (params: DeleteItem) => {
    console.log('params: ', params);
  };

  update = async (params: UpdateItem) => {
    console.log('params: ', params);
  };

  findByTitle = async (title: string) => {
    const params = {
      TableName: tableName,
      FilterExpression: "#key = :value",
      ExpressionAttributeNames:{
        "#key": "title"
      },
      ExpressionAttributeValues: {
        ":value": title
      }
    }

    const data = await this.client.scan(params).promise();

    return data.Items[0] as IArticle;
  }

  saveInHistory = async (item: any): Promise<void> => {
    const params: PutItem = {
      TableName: historyTableName,
      Item: {
        ...item,
        article_id: item.id,
        id: v4(),
      }
    }

    await this.client.put(params).promise();
  }
}

export default new DynamoDBRepository;
