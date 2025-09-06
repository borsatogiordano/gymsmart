import { beforeEach, describe, expect, it, test } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { AuthenticateService } from "./authenticate";
import { before } from "node:test";

describe("Authenticate Service", () => {

    let usersRepository: InMemoryUsersRepository;
    let sut: AuthenticateService;

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateService(usersRepository);
    })
    it("should be able to authenticate", async () => {


        await usersRepository.create({
            email: "test@example.com",
            password: await hash("password", 6)
        })

        const authResult = await sut.execute({
            email: "test@example.com",
            password: "password"
        });

        expect(authResult.user.id).toEqual(expect.any(String))
    })

    it("it should not be able to authenticate with wrong password", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateService(usersRepository);

        await expect(() => sut.execute({
            email: "johndoe@example.com",
            password: "wrong-password"
        })).rejects.toBeInstanceOf(Error)
    })
})
