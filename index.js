import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import typeDefs from './src/schemas/schema.js';
import resolvers from './src/resolvers/resolvers.js';

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server)
  );

  await mongoose.connect('mongodb+srv://gdzelishvili:vaniko12345@cluster-1.95o5a2c.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  httpServer.listen({ port: 4000 }, () => {
    console.log('Server is running on http://localhost:4000/graphql');
  });
}

startServer();


