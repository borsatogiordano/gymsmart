import { FastifyInstance } from "fastify";
import { registerUser } from "./controllers/userController";
import { authenticateUser } from "./controllers/authenticateController";


export async function appRoutes(app: FastifyInstance) {
    app.post("/users", registerUser);
    app.post("/sessions", authenticateUser);
}