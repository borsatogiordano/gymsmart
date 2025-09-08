import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsService } from "./search-gyms";
import { FetchNearbyGymsService } from "./fetch-nearby-gyms";



describe("Fetch Nearby Gyms UseCase", () => {

    let gymsRepository: InMemoryGymsRepository;
    let sut: FetchNearbyGymsService;

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsService(gymsRepository);
    })

    it("should be able to fetch nearby gyms", async () => {
        await gymsRepository.create({
            title: "Near Gym",
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        const { gyms } = await sut.execute({
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({ title: "Near Gym" }),
        ])
    })
})