
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInService } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resourceNotFound";

describe("Validate CheckIn UseCase", () => {

    let checkInsRepository: InMemoryCheckInsRepository;
    let sut: ValidateCheckInService;

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new ValidateCheckInService(checkInsRepository);
    })

    it("should be able to validate the check-in", async () => {

        const checkIn = await checkInsRepository.create({
            gymId: "gym-01",
            userId: "user-01",
        })

        const result = await sut.execute({
            checkInId: checkIn.id
        })

        expect(checkIn.validatedAt).toEqual(expect.any(Date));
        expect(checkInsRepository.items[0].validatedAt).toEqual(expect.any(Date));
    })

    it("it should not be able to validate an inexistent check-in", async () => {

        await expect(sut.execute({
            checkInId: "inexistent-id"
        })).rejects.toBeInstanceOf(ResourceNotFoundError);
    })
})