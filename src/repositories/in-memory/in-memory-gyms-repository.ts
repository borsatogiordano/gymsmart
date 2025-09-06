import { Gym } from "@prisma/client";

export class InMemoryGymsRepository {
    public items: Gym[] = [];

    async findById(id: string): Promise<Gym | null> {

        const gym = this.items.find(item => item.id === id);

        return gym || null;
    }

    async create(data: Gym): Promise<Gym> {
        this.items.push(data);
        return data;
    }


}