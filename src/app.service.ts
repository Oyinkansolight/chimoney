import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AppService {
  users: User[] = [
    {
      id: 1,
      name: 'John',
      age: 30,
    },
    {
      id: 2,
      name: 'Jane',
      age: 25,
    },
    {
      id: 3,
      name: 'Bob',
      age: 20,
    },
  ];

  getUsers(): User[] {
    return this.users;
  }

  createUser(createUserDto: CreateUserDto): User {
    const user: User = {
      name: createUserDto.name,
      age: createUserDto.age,
    };

    const count = this.users.length;
    user.id = count + 1;

    this.users.push(user);
    return user;
  }

  getUser(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.getUser(id);
    if (!user) throw new HttpException('User not found', 404);

    if (updateUserDto.age) user.age = updateUserDto.age;
    if (updateUserDto.name) user.name = updateUserDto.name;

    return user;
  }

  deleteUser(id: number): User {
    const user = this.getUser(id);
    if (!user) throw new HttpException('User not found', 404);

    const index = this.users.indexOf(user);
    this.users.splice(index, 1);

    return user;
  }
}
