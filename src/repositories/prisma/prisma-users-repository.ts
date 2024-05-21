import { $Enums, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prismadb";

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if(!user) return null

    return user
  }

  create(data: Prisma.UserCreateInput): Promise<{ id: string; name: string; email: string; role: $Enums.Role; passwordHash: string; imageUrl: string | null; createdAt: Date; updatedAt: Date; }> {
    return null
  }
}