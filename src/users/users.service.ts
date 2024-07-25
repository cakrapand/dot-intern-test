import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/helpers/password.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.findOneByUsername(createUserDto.username))
      throw new BadRequestException('Username used');

    try {
      const hashedPassword = await hashPassword(createUserDto.password);

      const newUser = this.usersRepository.create({
        name: createUserDto.name,
        username: createUserDto.username,
        password: hashedPassword,
      });
      if (!newUser)
        throw new InternalServerErrorException('Failed create user');
      return await this.usersRepository.save(newUser);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOneBy({ id: id });
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOneBy({ username: username });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return await this.findOneById(id);
  }
}
