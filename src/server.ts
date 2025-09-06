import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { appRoutes } from "./routes";
import { ZodError } from "zod";
import { env } from "process";

export const app = fastify();

app.register(appRoutes)

app.setErrorHandler((error: Error, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: "Validation Error", issues: error.format() });
    }

    if (env.NODE_ENV !== "production") {
        console.error(error);
    } else {
        // TODO: log error to external tool
    }
    reply.status(500).send({ message: "Internal Server Error" }); //TODO: fix
});

const port = 3333
app.listen({ port }).then(() => {
    console.log(`Server rodando na porta ${port}`);
})