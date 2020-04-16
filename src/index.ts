import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from 'typeorm';
import connectionOptions from './ormConfig';
import RegisterResolver from "./api/user/Register";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [ RegisterResolver ]
  });

  const apolloServer = new ApolloServer({ schema }) ;
  const app = Express();

  apolloServer.applyMiddleware({ app });
  
  app.listen(4000, () => {
    console.log("ApolloServer is Running to 4000");
  });
};

createConnection(connectionOptions).then(() => {
  main();
}).catch(error => {
  console.log("DB Error: ", error);
});
