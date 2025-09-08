import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "../../utils/get-distance-beetween-coordinates";

export class InMemoryGymsRepository {
    public items: Gym[] = [];

    async findById(id: string): Promise<Gym | null> {

        const gym = this.items.find(item => item.id === id);

        return gym || null;
    }

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description || null,
            phone: data.phone || null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
        }

        this.items.push(gym);

        return gym;
    }
    async searchMany(query: string, page: number): Promise<Gym[]> {
        return this.items.filter((gym) => gym.title.includes(query))
            .slice((page - 1) * 20, page * 20);
    }

    async findManyNearby(userLatitude: number, userLongitude: number): Promise<Gym[]> {
        return this.items.filter((gym) => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: userLatitude, longitude: userLongitude },
                { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
            )
            return distance < 10;
        });
    }
}