import { beforeEach, describe, expect, it, test } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { GetUserProfileService } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resourceNotFound";

describe("Get User Profile Use Case", () => {

    let usersRepository: InMemoryUsersRepository;
    let sut: GetUserProfileService;

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetUserProfileService(usersRepository);
    })
    it("should be able to authenticate", async () => {


        const createdUser = await usersRepository.create({
            email: "test@example.com",
            password: await hash("password", 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        });

        expect(user.email).toEqual("test@example.com")
    })

    it("it should not be able to get user profile with wrong id", async () => {

        expect(() => sut.execute({
            userId: "non-existing-id"
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
