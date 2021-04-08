import {
  Body,
  ConflictException,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    try {
      const user = await this.authService.signUp(body);
      return this.authService.login(user);
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException('Username already exists');
      }
      throw e;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Req() req) {
    return this.authService.login(req.user);
  }
}
