import { fastify } from "fastify";
import fastifyCors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "https://localhost:5173",
});

app.get("/health", async () => {
  return { status: "ok" };
});

app.register(getRoomsRoute);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.listen({ port: env.PORT }).then(() => {
  console.log("HTTP server running on  http://localhost:" + env.PORT);
});
