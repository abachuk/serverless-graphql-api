export default `
  type Author {
    id: ID!
    first_name: String
    last_name: String
    posts: [Post]
  }

  type Query {
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    createAuthor(
      first_name: String!
      last_name: String!
    ): Author
    updateAuthor(
      id: ID!
      first_name: String!
      last_name: String!
    ): Author
    deleteAuthor(
      id: ID!
    ): Author
  }
`;
