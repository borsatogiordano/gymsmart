import { Gym } from "@prisma/client";
import { GymRepository } from "../repositories/gymsRepository";

interface SearchGymsRequest {
    query: string;
    page?: number;
}

interface SearchGymsResponse {
    gyms: Gym[]
}

export class SearchGymsService {
    constructor(private gymsRepository: GymRepository) { }

    async execute({
        query,
        page
    }: SearchGymsRequest): Promise<SearchGymsResponse> {

        const gyms = await this.gymsRepository.searchMany(query, page ?? 1);

        return {
            gyms
        };
    }
}
