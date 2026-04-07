import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { KnexService } from '../database/knex.service';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly knexService: KnexService) {}

  private mapToResponseDto(user: User): UserResponseDto {
    return new UserResponseDto({
      id: user.id,
      email: user.email,
      name: user.name,
      is_active: user.is_active,
      register_date: user.register_date,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { email, name, password, is_active, register_date } = createUserDto;

    const existing = await this.knexService
      .connection('users')
      .where({ email })
      .first<User | undefined>();

    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await this.knexService
      .connection('users')
      .insert({
        email,
        name,
        password: hashedPassword,
        is_active: is_active ?? true,
        register_date: register_date ? new Date(register_date) : new Date(),
      })
      .returning<User[]>('*');

    return this.mapToResponseDto(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.knexService
      .connection('users')
      .select<User[]>('*');

    return users.map((user) => this.mapToResponseDto(user));
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.knexService
      .connection('users')
      .where({ id })
      .first<User | undefined>();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.mapToResponseDto(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.knexService
      .connection('users')
      .where({ email })
      .first<User | undefined>();

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.knexService
      .connection('users')
      .where({ id })
      .first<User | undefined>();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existing = await this.knexService
        .connection('users')
        .where({ email: updateUserDto.email })
        .first<User | undefined>();

      if (existing) {
        throw new ConflictException('Email already exists');
      }
    }

    const updateData: Partial<User> = {};
    if (updateUserDto.email) updateData.email = updateUserDto.email;
    if (updateUserDto.name) updateData.name = updateUserDto.name;
    if (updateUserDto.is_active !== undefined)
      updateData.is_active = updateUserDto.is_active;
    if (updateUserDto.register_date)
      updateData.register_date = new Date(updateUserDto.register_date);

    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const [updatedUser] = await this.knexService
      .connection('users')
      .where({ id })
      .update(updateData)
      .returning<User[]>('*');

    return this.mapToResponseDto(updatedUser);
  }

  async remove(id: number): Promise<UserResponseDto> {
    const user = await this.knexService
      .connection('users')
      .where({ id })
      .first<User | undefined>();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const [deactivatedUser] = await this.knexService
      .connection('users')
      .where({ id })
      .update({ is_active: false })
      .returning<User[]>('*');

    return this.mapToResponseDto(deactivatedUser);
  }
}
