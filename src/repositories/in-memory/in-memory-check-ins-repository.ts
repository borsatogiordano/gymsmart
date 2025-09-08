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
}