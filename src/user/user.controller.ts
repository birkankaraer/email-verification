import { Controller, Post, Get, Param, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.registerUser(createUserDto.username, createUserDto.email);
  }

  @Get('verify-email/:username/:verificationToken')
  async verifyEmail(@Param('username') username: string, @Param('verificationToken') verificationToken: string) {
    const isVerified = await this.userService.verifyEmail(username, verificationToken);

    if (!isVerified) {
      throw new BadRequestException('Invalid verification token or username.');
    }

    return { message: 'Email verified successfully' };
  }

  @Get('check-verification/:username')
  async checkVerification(@Param('username') username: string) {
    const isVerified = await this.userService.checkVerification(username);

    if (!isVerified) {
      return { message: 'User is not verified' };
    }

    return { message: 'User is verified' };
  }
}
