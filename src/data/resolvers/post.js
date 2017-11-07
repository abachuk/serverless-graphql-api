import * as dbAuthors from '../../dynamo/authors';
import * as dbPosts from '../../dynamo/posts';

export default {
  Query: {
    posts: () => dbPosts.getPosts(),
    post: (_, args) => dbPosts.getPostById(args.id),
  },
  Mutation: {
    createPost: (_, args) => dbPosts.createPost(args),
    updatePost: (_, args) => dbPosts.updatePost(args),
    deletePost: (_, args) => dbPosts.deletePost(args),
  },
  Post: {
    author: post => dbAuthors.getAuthorById(post.author)
    // createdAt: post => post.createdAt || 'no date'
  },
};
