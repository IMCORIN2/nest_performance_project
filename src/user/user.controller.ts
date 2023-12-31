import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() signupData: LoginDto) {
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
}
