export default `
  type Post {
    id: ID!
    title: String
    author: Author
    body: String
  }

  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  type Mutation {
    createPost(
      title: String!
      author: String!
      body: String!
    ): Post
    updatePost(
      id: ID!
      title: String
      author: String
      body: String
    ): Post
    deletePost(
      id: ID!
    ): Post
  }
`;
