import { Prisma, Role, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email)

    if(!user) return null

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name ?? 'in-memory-user',
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: data.imageUrl ?? 'https://example.com/image.jpg',
      role: data.role ?? Role.MEMBER
    }

    this.users.push(user)
    return user
  }

}