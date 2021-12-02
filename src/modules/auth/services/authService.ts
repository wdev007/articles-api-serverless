import jwt, { VerifyOptions  } from 'jsonwebtoken';
import jwks from 'jwks-rsa';
import { APIGatewayAuthorizerEvent, PolicyDocument } from 'aws-lambda';
import { IPayload } from 'src/shared/types/IPayload';
import { IDecode } from 'src/shared/types/IDecode';

export default class AuthService {
    private jwksUri: string | undefined;
    private audience: string | undefined;
    constructor() {
        this.jwksUri = process.env.JWKS_URI;
        this.audience = process.env.AUDIENCE;
    }

    getPolicyDocument = (effect: string, resource: string): PolicyDocument => {
        return {
            Version: '2012-10-17', // default version
            Statement: [{
                Action: 'execute-api:Invoke', // default action
                Effect: effect,
                Resource: resource,
            }]
        };
    }

    _getToken = (event: APIGatewayAuthorizerEvent): string => {
        if (!event.type || event.type !== 'TOKEN') {
            throw new Error('Expected "event.type" parameter to have value "TOKEN"');
        }

        const tokenString = event.authorizationToken;
        if (!tokenString) {
            throw new Error('Expected "event.authorizationToken" parameter to be set');
        }

        const match = tokenString.match(/^Bearer (.*)$/);
        if (!match || match.length < 2) {
            throw new Error(`Invalid Authorization token - ${tokenString} does not match "Bearer .*"`);
        }
        return match[1];
    }

    authenticate = async (event: APIGatewayAuthorizerEvent) => {
        const token = this._getToken(event);
        const decoded = (jwt.decode(token, { complete: true })) as IDecode;

        if (!decoded || !decoded.header || !decoded.header.kid) {
            throw new Error('invalid token');
        }
        const options = {
            audience: this.audience,
            algorithms: ['RS256'],
        } as VerifyOptions;

        const key = await this._getSigningKey(decoded.header.kid);
        const decodedResponse = jwt.verify(token, key, options) as IPayload; 

        return ({
            principalId: decodedResponse?.sub,
            policyDocument: this.getPolicyDocument('Allow', event.methodArn),
            context: { scope: decodedResponse.scope }
        })
    }

    _getSigningKey = (kid: string): Promise<string> => {
        const client = jwks({
            jwksUri: this.jwksUri,
        });
        return new Promise((resolve, reject) =>  {
            client.getSigningKey(kid, ((error, key) => {
                if (error) {
                    reject(error);
                }
                if ("publicKey" in key) {
                    resolve(key.publicKey);
                } else if ("rsaPublicKey" in key) {
                    resolve(key.rsaPublicKey);
                }
            }));
        })
    }

}