const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

//dummy data
var books = [
  { id: "1", name: "Book One", genre: "Fantasy", authorId: "2" },
  { id: "2", name: "Book Two", genre: "Science Fiction", authorId: "3" },
  { id: "3", name: "Book Three", genre: "Mystery", authorId: "1" },
  { id: "4", name: "Book Four", genre: "Romance", authorId: "1" },
  { id: "5", name: "Book Five", genre: "Thriller", authorId: "2" },
  { id: "6", name: "Book Six", genre: "Horror", authorId: "3" },
];

var authors = [
  { id: "1", name: "Author One", age: 44 },
  { id: "2", name: "Author Two", age: 36 },
  { id: "3", name: "Author Three", age: 29 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }, 
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
