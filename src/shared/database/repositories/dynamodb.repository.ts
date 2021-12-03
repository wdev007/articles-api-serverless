import * as AWS from "aws-sdk";
import HttpResponse from "../../http/responses";
import { IArticle } from "../../types/IArticle";
import { IConfigAws } from "../../types/IConfigAws";
import { IRepository } from "../../types/IRepository";

type PutItem = AWS.DynamoDB.DocumentClient.PutItemInput;
type QueryItem = AWS.DynamoDB.DocumentClient.QueryInput;
type UpdateItem = AWS.DynamoDB.DocumentClient.UpdateItemInput;
type DeleteItem = AWS.DynamoDB.DocumentClient.DeleteItemInput;

type Item = {[index: string]: string};

const {
    STAGE,
    DYNAMODB_LOCAL_STAGE,
    DYNAMODB_LOCAL_ACCESS_KEY_ID,
    DYNAMODB_LOCAL_SECRET_ACCESS_KEY,
    DYNAMODB_LOCAL_ENDPOINT
} = process.env;

const config: IConfigAws = { region: "eu-west-1" };

if (STAGE === DYNAMODB_LOCAL_STAGE) {
    config.accessKeyId = DYNAMODB_LOCAL_ACCESS_KEY_ID; // local dynamodb accessKeyId
    config.secretAccessKey = DYNAMODB_LOCAL_SECRET_ACCESS_KEY; // local dynamodb secretAccessKey
    config.endpoint = DYNAMODB_LOCAL_ENDPOINT; // local dynamodb endpoint
}

AWS.config.update(config);

const documentClient = new AWS.DynamoDB.DocumentClient();

class DynamoDBRepository implements IRepository {
  private client: AWS.DynamoDB.DocumentClient;

  constructor(client = documentClient) {
    this.client = client;
  }

  create = async (params: PutItem): Promise<IArticle> => {
    console.log('params: ', params);
    try {
      await this.client.put(params).promise();

      return {
        title: ''
      }
    } catch (error) {
      throw new HttpResponse().send({
        status: 500,
        body: error
      });
    }
  };

  find = async (params: QueryItem): Promise<IArticle> => {
    console.log('params: ', params);
    return {
      title: "",
    };
  };

  findAll = async (params: QueryItem): Promise<IArticle[]> => {
    console.log('params: ', params);
    return [];
  };

  delete = async (params: DeleteItem) => {
    console.log('params: ', params);
  };

  update = async (params: UpdateItem) => {
    console.log('params: ', params);
  };
}

export default DynamoDBRepository;
