import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { compare, hash } from "bcryptjs";

interface RegisterUserUseCaseParams {
  email: string;
  password: string;
  name: string
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor (private usersRepository: UsersRepository ) {}

  async execute({
    email,
    password,
    name
  }: RegisterUserUseCaseParams): Promise<RegisterUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if(userAlreadyExists) throw new InvalidCredentialsError()
    
    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      email,
      name,
      passwordHash,
    })

    return {
      user
    }
  }
}