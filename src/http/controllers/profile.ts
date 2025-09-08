import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileUseCase } from "../../services/factories/make-get-user-profile-use-case";

export async function profile(req: FastifyRequest, res: FastifyReply) {

    const getUserProfile = makeGetUserProfileUseCase()

    const { user } = await getUserProfile.execute({
        userId: req.user.sub,
    });

    return res.status(200).send({ ...user, password: undefined });
}