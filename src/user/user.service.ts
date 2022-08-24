import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userService: Repository<User>) {}

  async signup(signupDto: SignupDto): Promise<User> {
    try {
      const { username, password } = signupDto;

      const hashPassword = bcrypt.hashSync(password, 10);

      const user = this.userService.create({
        username,
        password: hashPassword,
      });

      return await this.userService.save(user);
    } catch (error) {
      throw new ConflictException({
        message: 'Username already exists..',
      });
    }
  }

  async findOneUser(username: string): Promise<User | undefined> {
    return this.userService.findOne({ where: { username } });
  }
}
