//set up graphql apollo server
const {ApolloServer} = require('apollo-server');
const {typeDefs, resolvers} = require('./data/schema');
const startApolloServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    await server.listen(4000);
    console.log('Apollo Server is running at http://localhost:4000/graphql');
}
startApolloServer();

