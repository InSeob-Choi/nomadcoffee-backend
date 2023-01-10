require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import client from "./client";
import schema from "./schema.js";

const server = new ApolloServer({
  schema,
});

const PORT = process.env.PORT;

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();
