import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../checkInsRepository";
import { prisma } from "../../lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInRepository {

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfDay = dayjs(date).startOf("date").toDate();
        const endOfDay = dayjs(date).endOf("date").toDate();

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                userId,
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            }
        });
        return checkIn;
    }

    async findManyByUserId(userId: string, page: number) {
        const checkIns = await prisma.checkIn.findMany({
            where: { userId },
            take: 20,
            skip: (page - 1) * 20,
        });
        return checkIns;
    }

    async countByUserId(userId: string) {
        const count = await prisma.checkIn.count({
            where: { userId }
        })
        return count;
    }

    async findById(id: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where: { id }
        });
        return checkIn;
    };

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data
        });
        return checkIn;
    }

    async save(checkIn: CheckIn) {
        const updatedCheckIn = await prisma.checkIn.update({
            where: { id: checkIn.id },
            data: checkIn,
        })
        return updatedCheckIn;
    }
}