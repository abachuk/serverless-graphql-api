import uuid from 'uuid/v1';
import * as db from './dynamo';

const TableName = 'test_authors';

export function getAuthors() {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'first_name',
      'last_name',
    ],
  };

  return db.scan(params);
}

export function getAuthorById(id) {
  const params = {
    TableName,
    Key: {
      id,
    },
    AttributesToGet: [
      'id',
      'first_name',
      'last_name',
    ],
  };
  return db.get(params, (err, data) => {
    if(err) {
      console.log('getAuthorById ERROR', err);
    } else {
      return data;
    }
  })
}

export function createAuthor(args) {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      first_name: args.first_name,
      last_name: args.last_name,
    },
  };

  return db.createItem(params);
}

export function updateAuthor(args) {
  const params = {
    TableName: 'test_authors',
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
  console.log('AUTHOR params ', params);
  return db.updateItem(params, args);
}

export function deleteAuthor(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
