const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const dotenv =require('dotenv')
dotenv.config()
const typeDefs = require('./src/typeDefs')
const resolvers = require('./src/resolvers/index')



const server = new ApolloServer({
    typeDefs,
    resolvers
})

try {
     mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    console.log('Connected to database')
} catch (error) {
    console.log('Connection to DB failed', error)
    process.exit(1)
}

server.listen({port:5000})
.then(res =>{
    console.log(`server runnning at ${res.url}`)
})