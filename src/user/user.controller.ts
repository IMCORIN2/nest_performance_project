import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() signupData: SignupDto) {
    return await this.userService.signup(
      signupData.email,
      signupData.password,
      signupData.name,
    );
  }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return await this.userService.login(loginData.email, loginData.password);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('me/:id')
  async getMyInfo(@Param('id') id: number) {
    const user = await this.userService.getMyInfo(id);
    const { name, point } = user;
    return { name, point };
  }
}
