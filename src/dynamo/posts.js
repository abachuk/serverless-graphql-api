import uuid from 'uuid/v1';
import * as db from './dynamo';

const TableName = 'test_posts';

export function getPosts() {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'title',
      'createdAt',
      'author',
      'body',
      'image'
    ],
  };

  return db.scan(params);
}

export function getPostById(id) {
  const params = {
    TableName,
    Key: {
      id,
    },
  };

  return db.get(params);
}

export function getPostsByAuthor(authorId) {
  const params = {
    TableName,
    FilterExpression: 'author = :author_id',
    ExpressionAttributeValues: { ':author_id': authorId },
  };

  return db.scan(params);
}

export function createPost(args) {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      createdAt: (new Date()).toString(),
      title: args.title,
      author: args.author,
      body: args.body,
      image: args.image
    },
  };

  return db.createItem(params);
}

export function updatePost(args) {
  let params = {
    TableName: 'test_posts',
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {},
    UpdateExpression: 'SET ',
    ReturnValues: 'ALL_NEW',
  };

  for (const propKey in args) {
    if(propKey !== 'id'){
      params.ExpressionAttributeValues[`:${propKey}`] = args[propKey];
      params.UpdateExpression += `${propKey} = :${propKey}, `;
    }
  };
  params.UpdateExpression = params.UpdateExpression.slice(0, -2); //removing last comma and space
  return db.updateItem(params, args);
}

export function deletePost(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
