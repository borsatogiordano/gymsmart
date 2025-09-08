

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsService } from "./get-user-metrics";

describe("Fetch User Check-in Metrics", () => {

    let checkInsRepository: InMemoryCheckInsRepository;
    let sut: GetUserMetricsService;

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new GetUserMetricsService(checkInsRepository);
    })

    it("should be able to fetch user check ins count from metrics", async () => {

        await checkInsRepository.create({
            gymId: "gym-01",
            userId: "user-01",
        })

        await checkInsRepository.create({
            gymId: "gym-02",
            userId: "user-01",
        })

        const { checkInsCount } = await sut.execute({
            userId: "user-01",
        })

        expect(checkInsCount).toBe(2);
    })
})