import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "../../services/errors/invalidCredentialsError";
import { makeAuthenticateUseCase } from "../../services/factories/make-authenticate-use-case";


export async function authenticateUser(req: FastifyRequest, res: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().min(2).max(100),
        password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
    });

    const { email, password } = authenticateBodySchema.parse(req.body)

    try {
        const authenticateService = makeAuthenticateUseCase()
        const { user } = await authenticateService.execute({ email, password });

        const token = await res.jwtSign({

            sub: user.id

        });

        return res.status(200).send({ token });
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return res.status(400).send({ message: error.message });
        }
        throw error;
    }
}