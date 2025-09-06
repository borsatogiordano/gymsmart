import { beforeEach, describe, expect, it, test } from "vitest";
import { UserAlreadyExistsError } from "./errors/userAlreadyExists";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { CreateGymService } from "./create-gym";

describe("Create Gym Service", () => {

    let gymsRepository: InMemoryGymsRepository;
    let sut: CreateGymService;

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new CreateGymService(gymsRepository);

        await gymsRepository.create({
            title: "Test Gym",
            description: "Test Gym Description",
            phone: "123456789",
            latitude: -23.5505,
            longitude: -46.6333
        });
    })

    it("should be able to create gym", async () => {

        const { gym } = await sut.execute({
            title: "Test Gym",
            description: "Test Gym Description",
            phone: "123456789",
            latitude: -23.5505,
            longitude: -46.6333
        });

        expect(gym.id).toEqual(expect.any(String));
    })
})