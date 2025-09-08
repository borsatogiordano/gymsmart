import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";
import { check } from "zod";

export class InMemoryCheckInsRepository {
    public items: CheckIn[] = [];
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {

        const checkIn = {
            id: randomUUID(),
            userId: data.userId,
            gymId: data.gymId,
            createdAt: new Date(),
            updatedAt: new Date(),
            validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
        }

        this.items.push(checkIn);
        return checkIn;
    }
    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {

        const startOfTheDay = dayjs(date).startOf("date");
        const endOfTheDay = dayjs(date).endOf("date");

        const checkInOnTheSameDate = this.items.find((checkIn) => {
            const checkInDate = dayjs(checkIn.createdAt)
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
            return checkIn.userId === userId && isOnSameDate
        })
        if (!checkInOnTheSameDate) {
            return null
        }

        return checkInOnTheSameDate;
    }
    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        return this.items.filter((checkIn) => checkIn.userId === userId)
            .slice((page - 1) * 20, page * 20);
    }
    async countByUserId(userId: string): Promise<number> {
        return this.items.filter((checkIn) => checkIn.userId === userId).length;
    }
    async findById(id: string): Promise<CheckIn | null> {
        const checkIn = this.items.find((checkIn) => checkIn.id === id);
        return checkIn || null;
    }

    async save(checkIn: CheckIn) {
        const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id);

        if (checkInIndex >= 0) {
            this.items[checkInIndex] = checkIn;
        }

        return checkIn;
    }
}