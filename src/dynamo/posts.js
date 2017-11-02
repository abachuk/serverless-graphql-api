import uuid from 'uuid/v1';
import * as db from './dynamo';

const TableName = 'test_posts';

export function getPosts() {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'title',
      'authors',
      'body',
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
    FilterExpression: 'author = :authort_id',
    ExpressionAttributeValues: { ':author_id': authorId },
  };

  return db.scan(params);
}

export function createPost(args) {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      title: args.title,
      author: args.author,
      body: args.body,
    },
  };

  return db.createItem(params);
}

export function updatePost(args) {
  const params = {
    TableName: 'test_posts',
    Key: {
      id: args.id,
    },
    ExpressionAttributeNames: {
      '#post_body': 'body',
    },
    ExpressionAttributeValues: {
      ':title': args.title,
      ':author': args.author,
      ':body': args.body,
    },
    UpdateExpression: 'SET title = :title, author = :author, #post_body = :body',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
}

export function deletePosts(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
