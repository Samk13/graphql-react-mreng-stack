const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const { MONGODB } = require('./config.js')

const Post = require('./models/Post')

const PORT = 3001

const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }

    type Query{
        getPosts: [Post]
    }
`

const resolvers = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find()
                return posts
            } catch (error) {
                throw new Error(error)
            }
        }
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