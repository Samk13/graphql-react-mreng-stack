const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose');
const { MONGODB } = require('./config.js')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const PORT = 3001

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose
    .connect(MONGODB, {useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('connect to MONGODB successfully 🤙🏼');

        return server.listen({
            port: PORT
        })
    })
    .then(res => {
        console.log(`server running on port ${res.port}`);
    })