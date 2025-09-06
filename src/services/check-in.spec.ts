
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./check-in";

describe("Register Service", () => {

    let checkInsRepository: InMemoryCheckInsRepository;
    let sut: CheckInService;

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckInService(checkInsRepository);

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it("should be able to check in", async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        const { checkIn } = await sut.create({
            userId: "user-01",
            gymId: "gym-01"
        })

        console.log(checkIn.createdAt)

        expect(checkIn.id).toEqual(expect.any(String));
    })

    it("should not be able to check in twice in the same day", async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        const { checkIn } = await sut.create({
            userId: "user-01",
            gymId: "gym-01"
        })

        await expect(async () => {
            await sut.create({
                userId: "user-01",
                gymId: "gym-01"
            })
        }).rejects.toBeInstanceOf(Error);
    })

    it("should not be able to check in twice in different days", async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.create({
            userId: "user-01",
            gymId: "gym-01"
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.create({
            userId: "user-01",
            gymId: "gym-01"
        })

        expect(checkIn.id).toEqual(expect.any(String));
    })
})