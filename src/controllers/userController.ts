import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "../services/errors/userAlreadyExists";
import { makeRegisterUseCase } from "../services/factories/make-register-use-case";


export async function registerUser(req: FastifyRequest, res: FastifyReply) {
    const registerBodySchema = z.object({
        email: z.string().min(2).max(100),
        password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
    });

    const { email, password } = registerBodySchema.parse(req.body)

    try {
        const registerService = makeRegisterUseCase()
        await registerService.execute({ email, password });
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return res.status(409).send({ message: error.message });
        }
        throw error;
    }
    return res.status(201).send();
}