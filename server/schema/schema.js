const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data
var books = [
    { id: '1', name: 'Book One', genre: 'Fantasy' },
    { id: '2', name: 'Book Two', genre: 'Science Fiction' },
    { id: '3', name: 'Book Three', genre: 'Mystery' },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },  
        genre: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                return _.find(books, { id: args.id });
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery, 
});