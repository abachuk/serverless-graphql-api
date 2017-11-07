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
  console.log(params);
  return db.get(params, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      console.log(data);
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
    ExpressionAttributeValues: {
      ':first_name': args.first_name,
      ':last_name': args.last_name,
    },
    UpdateExpression: 'SET first_name = :first_name, last_name = :last_name',
    ReturnValues: 'ALL_NEW',
  };

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
