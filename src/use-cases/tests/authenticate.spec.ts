import { beforeEach, describe, expect, it } from "vitest";
import { UsersRepository } from "@/repositories/users-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "../users/authenticate";
import { hash } from "bcryptjs";

let usersRepository: UsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it("should authenticate", async () => {
    await usersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      passwordHash: await hash('12345678', 8),
    })

    const response = await sut.execute({
      email: "johndoe@example.com",
      password: "12345678",
    })


    expect(response.user).toEqual(expect.objectContaining({
      id: expect.any(String),
    }))
  })
})