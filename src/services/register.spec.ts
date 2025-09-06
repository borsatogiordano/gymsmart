import { Prisma } from "@prisma/client";
import { beforeEach, describe, expect, it, test } from "vitest";
import { PrismaUserRepository } from "../repositories/prisma/prismaUserRepository";
import { RegisterService } from "./userService";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/userAlreadyExists";

describe("Register Service", () => {

    let usersRepository: InMemoryUsersRepository;
    let sut: RegisterService;

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new RegisterService(usersRepository);
    })

    it.skip("should hash user password upon registration", async () => {


        const { user } = await sut.execute({
            email: "test@example.com",
            password: "password"
        });

        const isPasswordCorrectlyHashed = await compare("password", user.password)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it("should not be able to register a user with an existing email", async () => {

        await sut.execute({
            email: "test@example.com",
            password: "password"
        });

        await expect(sut.execute({
            email: "test@example.com",
            password: "password"
        })).rejects.toBeInstanceOf(UserAlreadyExistsError);
    })
})