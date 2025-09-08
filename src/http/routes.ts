import { FastifyInstance } from "fastify";
import { registerUser } from "./controllers/userController";
import { authenticateUser } from "./controllers/authenticateController";
import { profile } from "./controllers/profile";
import { verifyJWT } from "./middlewares/verify-jwt";


export async function appRoutes(app: FastifyInstance) {
    app.post("/users", registerUser);
    app.post("/sessions", authenticateUser);

    app.get("/me", { preHandler: verifyJWT }, profile);
}