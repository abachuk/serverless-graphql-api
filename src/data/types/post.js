export default `
  type Post {
    id: ID!
    title: String!
    createdAt: String
    author: Author
    body: String
    image: String
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
      image: String
    ): Post
    updatePost(
      id: ID!
      title: String
      author: String
      body: String
      image: String
    ): Post
    deletePost(
      id: ID!
    ): Post
  }
`;
