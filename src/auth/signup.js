import AWS from 'aws-sdk';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

export default function signupHandler(body) {
  const userData = JSON.parse(body);
  AWS.config.region = 'us-east-1';

  const poolData = {
    UserPoolId: 'us-east-1_4nMl1uGjK',
    ClientId: '3ap2pm7bk2ecn958f9n0tdfveb',
  };

  const userPool = new CognitoUserPool(poolData);

  const attributeList = [];

  const attributeEmail = {
    Name: 'email',
    Value: userData.email,
  };

  attributeList.push(attributeEmail);
  // attributeList.push(attributePhoneNumber);
  return new Promise((resolve, reject) => {
    userPool.signUp(
      userData.username,
      userData.password,
      attributeList,
      null,
      (error, result) => {
        if (error) return reject(error);

        const response = {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: result.user.username,
            id: result.userSub,
            userConfirmed: result.userConfirmed,
          }),
          isBase64Encoded: false,
        };

        return resolve(response);
      },
    );
  });
}
