import { hash } from "bcryptjs";
import { UserRepository } from "../repositories/userRepository";
import { UserAlreadyExistsError } from "./errors/userAlreadyExists";
import { Gym, User } from "@prisma/client";
import { GymRepository } from "../repositories/gymsRepository";

interface CreateGymRequest {
    title: string;
    description?: string | null;
    phone: string;
    latitude: number;
    longitude: number;
}

interface CreateGymResponse {
    gym: Gym
}

export class CreateGymService {
    constructor(private gymsRepository: GymRepository) { }

    async execute({
        title,
        description,
        phone,
        latitude,
        longitude }: CreateGymRequest): Promise<CreateGymResponse> {

        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude
        });

        return {
            gym
        }
    }
}