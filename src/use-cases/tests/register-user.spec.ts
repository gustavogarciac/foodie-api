import { beforeEach, describe, expect, it } from "vitest";
import { UsersRepository } from "@/repositories/users-repository";
import { RegisterUserUseCase } from "../users/register-user";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { compare } from "bcryptjs";

let usersRepository: UsersRepository;
let sut: RegisterUserUseCase;

describe("Register User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it("should register a new user", async () => {
    const response = await sut.execute({
      email: "john-doe@example.com",
      name: "John Doe",
      password: "12345678",
    })

    expect(response.user).toEqual(expect.objectContaining({
      id: expect.any(String),
    }))
  })

  it("should not register a user with an existing email", async () => {
    await sut.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '12345678',
    })

    await expect(() => 
      sut.execute({
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should hash the user's password", async () => {
    const response = await sut.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '12345678',
    })

    expect(response.user.passwordHash).not.toBe('12345678')

    const isPasswordCorrect = await compare('12345678', response.user.passwordHash)

    expect(isPasswordCorrect).toBe(true)
  })
})