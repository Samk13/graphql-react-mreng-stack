const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const { MONGODB } = require('./config.js')

const PORT = 3001
const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`

const resolvers = {
    Query: {
        sayHi: () => 'Hello world'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGODB, {useNewUrlParser: true,
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