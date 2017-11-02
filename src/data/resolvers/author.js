import * as dbAuthors from '../../dynamo/authors';
import * as dbPosts from '../../dynamo/posts';

export default {
  Query: {
    authors: () => dbAuthors.getAuthors(),
    author: (_, args) => dbAuthors.getAuthorById(args.id),
  },
  Mutation: {
    createAuthor: (_, args) => dbAuthors.createAuthor(args),
    updateAuthor: (_, args) => dbAuthors.updateAuthor(args),
    deleteAuthor: (_, args) => dbAuthors.deleteAuthor(args),
  },
  Author: {
    posts: author => dbPosts.getPostsByAuthor(author.id),
  },
};
