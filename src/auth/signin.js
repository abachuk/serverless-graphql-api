import AWS from 'aws-sdk';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';

export default function signinHandler(body) {
  const authData = JSON.parse(body);
  AWS.config.region = 'us-east-1';

  const authenticationDetails = {
    Username: authData.username,
    Password: authData.password,
  };

  const poolData = {
    UserPoolId: 'us-east-1_4nMl1uGjK',
    ClientId: '3ap2pm7bk2ecn958f9n0tdfveb'
  };

  const authDetails = new AuthenticationDetails(authenticationDetails);
  const userPool = new CognitoUserPool(poolData);
  const userData = {
    Username: authData.username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess(result) {
        const response = {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken: result.getAccessToken().getJwtToken(),
            token: result.getIdToken().getJwtToken(),
            email_verified: result.getIdToken().payload.email_verified,
            email: result.getIdToken().payload.email,
            id: result.getIdToken().payload.sub,
            aud: result.getIdToken().payload.aud,
            refreshToken: result.refreshToken.token,
            authenticated: true,
            username: result.getIdToken().payload['cognito:username'],
          }),
          isBase64Encoded: false,
        };
        console.log(result);
        return resolve(response);
      },

      onFailure(error) {
        const response = {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            error,
            authenticated: false,
          }),
          isBase64Encoded: false,
        };
        return reject(response);
      },
    });
  });
}
