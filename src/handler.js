import { graphqlLambda } from 'graphql-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

// Types
import authorType from './data/types/author';
import postType from './data/types/post';

// Resolvers
import authorResolver from './data/resolvers/author';
import postResolver from './data/resolvers/post';

//Auth
import signupHandler from './auth/signup';
import signinHandler from './auth/signin';

const typeDefs = mergeTypes([authorType, postType]);
const resolvers = mergeResolvers([authorResolver, postResolver]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

exports.graphql = (event, context, callback) => {
  /**
   * event - { resource: {path: /graphql, headers: ..., body: '{query:{...}}'}}
   * context - { done: (), fail: (), functionName: 'graphql-api-dev-graphql', memoryLimitInMB: '1024', invokeId: '...'}
   * callback - (err, data) => {finish(err, data, waitToFinish)}
   **/

  console.log('event');
  console.log(event.requestContext.authorizer.claims);
  const callbackFilter = (error, output) => {
    const outputWithHeader = Object.assign({}, output, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    console.log('graphql handler error', error);
    callback(error, outputWithHeader);
  };

  graphqlLambda({ schema })(event, context, callbackFilter);
};

exports.record = (event, context, callback) => {
  event.Records.forEach((record) => {
    // console.log(record.eventID);
    // console.log(record.eventName);
    // console.log('DynamoDB Record: %j', record.dynamodb);
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
};

exports.signin = async (event, context, callback) => {
  try {
    const response = await signinHandler(event.body);
    callback(null, response);
  } catch (error) {
    callback(error);
  }
};

exports.signup = async (event, context, callback) => {
  try {
    const signup = await signupHandler(event.body);
    callback(null, signup);
  } catch (error) {
    callback(error);
  }
};
