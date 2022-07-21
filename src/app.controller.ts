import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'interface';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The user(s) have been retrieved successfully.',
  })
  findAll(): User[] {
    return this.appService.getUsers();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'The request is invalid.',
  })
  create(@Body() createUserDto: CreateUserDto): User {
    return this.appService.createUser(createUserDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The user has been retrieved successfully.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  findOne(@Param('id') id: number) {
    return this.appService.getUser(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiNotFoundResponse({ description: 'User not found and cannot be updated.' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.appService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'User cannot be deleted as the User was not found.',
  })
  remove(@Param('id') id: number) {
    return this.appService.deleteUser(id);
  }
}
