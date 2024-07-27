import { FastifyReply } from "fastify";
import { app } from "./app";

app.get("/", (_, reply: FastifyReply) => {
  return reply.status(200).send({ message: "faf api server v0.0.0" });
});

app
  .listen({
    host: "0.0.0.0",
    port: 3333,
  })
  .then(() => {
    console.log("faf api server running...");
  });
