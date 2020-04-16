import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from 'typeorm';
import connectionOptions from './ormConfig';
import RegisterResolver from "./api/user/Register";
import session from "express-session";
import { redis } from "./redis";
import connectRedis from 'connect-redis';
import cors from 'cors';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [ RegisterResolver ]
  });

  const apolloServer = new ApolloServer({ 
    schema,
    context: ({ req }: any) => ({ req })
  });
  
  const app = Express();

  const RedisStore = connectRedis(session);
  
  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: "asdfsfasg",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 year
      }
    })
  );

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
