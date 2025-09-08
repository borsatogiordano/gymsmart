import { Prisma, Gym } from "@prisma/client";
import { GymRepository } from "../gymsRepository";
import { prisma } from "../../lib/prisma";

export class PrismaGymsRepository implements GymRepository {

    create(data: Prisma.GymCreateInput) {
        const gym = prisma.gym.create({
            data
        });
        return gym
    }

    findById(id: string) {
        const gym = prisma.gym.findFirst({
            where: { id }
        })

        return gym
    }

    searchMany(query: string, page: number) {
        const gyms = prisma.gym.findMany({
            where: {
                title: {
                    contains: query,
                    mode: "insensitive"
                }
            }
            , take: 20,
            skip: (page - 1) * 20,
        })
        return gyms
    }

    findManyNearby(userLatitude: number, userLongitude: number) {
        const gyms = prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) )
        * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) *
        sin( radians( latitude ) ) ) ) <= 10
        `
        return gyms
    }
}