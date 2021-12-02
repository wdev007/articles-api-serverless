type IGeneric<T> = {
  [index in string | number | any]: T;
};

class AwsPolicyGeneratorService {
  static generate(principalId: string, effect: string, methodArn: string, context?: any) : any {
    const authResponse: IGeneric<unknown> = {};

    authResponse.principalId = principalId;
    if (effect && methodArn) {
        authResponse.policyDocument = {
            Version: '2012-10-17',
            Statement: [{
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: methodArn,
            }]
        }
    }

    if (context) {
        authResponse.context = context;
    }

    return authResponse;
  }
}

export default AwsPolicyGeneratorService;