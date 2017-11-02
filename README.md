# serverless-graphql-api

Inspired by https://github.com/boazdejong/serverless-graphql-api


# Serverless GraphQL API using Lambda and DynamoDB
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Build Status](https://travis-ci.org/boazdejong/serverless-graphql-api.svg?branch=master)](https://travis-ci.org/boazdejong/serverless-graphql-api)

GraphQL Lambda Server using [graphql-server-lambda](https://github.com/apollographql/graphql-server/tree/master/packages/graphql-server-lambda) from [Apollo](http://dev.apollodata.com/).

[graphql-tools](https://github.com/apollographql/graphql-tools) and [merge-graphql-schemas](https://github.com/okgrow/merge-graphql-schemas) are used to generate the schema.

[serverless-webpack](https://github.com/elastic-coders/serverless-webpack) is used to transform ES6 with [Babel](https://babeljs.io/) and build the lambda.


## Setup
Clone the repository and install the packages.

```
git clone https://github.com/abachuk/serverless-graphql-api
cd serverless-graphql-api
npm install
```

## Deploy
Run the `deploy` script to create the Lambda Function and API Gateway for GraphQL. This also creates two DynamoDB tables named `authors` and `posts`
```
npm run deploy
```

## Queries and Mutations
Query the GraphQL server using the [GraphiQL.app](https://github.com/skevy/graphiql-app). If you have Homebrew installed on OSX run
```
brew cask install graphiql
```

### Mutations
The following mutations are available in this example.

#### createAuthor()
Create an artist providing the first and last name as arguments. The id will be a generated uuid.
```graphql
mutation {
  createAuthor(first_name: "Agent", last_name: "Smith") {
    id
  }
}
```

#### createPost()
Using the generated id from the artist you can create a song with the following mutation. Also provide a title and duration.
```graphql
mutation {
  createSong(post: "34b236e0-0734-54e7-b2cd-45ue6a3b9071", title: "Whatever", body: "my long and very interesting post") {
    id
  }
}
```

#### updateAuthor()
```graphql
mutation {
  updateArtist(id: "34b236e0-0734-54e7-b2cd-45ue6a3b9071", first_name: "Agent", last_name: "Jones") {
    id
    first_name
    last_name
  }
}
```

#### updatePost()
```graphql
mutation {
  updatePost(id: "w1a0a060-091b-11e7-bd09-1092f101s7c0", author: "34b236e0-0734-54e7-b2cd-45ue6a3b9071", body:
  "even more interesting post", title: "A new title") {
    id
  }
}
```

### Queries
#### Example query
```graphql
{
  posts {
    id
    title
    body
    author {
      id
      first_name
      last_name
    }
  }
}
```

This query will return a result similar to this
```json
{
  "data": {
    "songs": [
      {
        "id": "w1a0a055-091b-11e7-bd09-1092f101s7c1",
        "title": "Whatever",
        "body": "super duper cool blog post",
        "artist": {
          "id": "99a746e0-0734-11e7-b2fd-45ae0a3b9074",
          "first_name": "Agent",
          "last_name": "Brown"
        }
      }
    ]
  }
}
```

## DynamoDB Streams
This project also includes an example of capturing table activity with DynamoDB Streams.
The `record` lambda function is triggered by two stream events. One for each table.

In `serverless.yml`:
```
record:
  handler: lib/handler.record
  events:
    - stream:
        type: dynamodb
        arn:
          Fn::GetAtt:
            - PostsDynamoDbTable
            - StreamArn
        batchSize: 1
    - stream:
        type: dynamodb
        arn:
          Fn::GetAtt:
            - PostsDynamoDbTable
            - StreamArn
        batchSize: 1
```

The stream is enabled when defining the DynamoDB table in the `serverless.yml` resources.
```
StreamSpecification:
  StreamViewType: NEW_AND_OLD_IMAGES
```
