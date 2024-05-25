import { Controller, Post, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseStatus } from '../../types';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { UserLogin, UserRegister } from './types';
import { OTPDto } from './dto/emailDto';
import { CONFIRMDto } from './dto/confirmDto';
import { UpdateAuthDto } from './dto/updateAuthDto';

@Controller('auth')
@ApiTags('Auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('otp')
  @ApiOperation({ summary: 'Verify OTP for email' })
  @ApiResponse({ status: 200, description: 'Send OTP successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async otpVerify(@Body() dto: OTPDto ) {
    return await this.authService.otpVerify(dto);
  }

  @Patch('update/password')
  @ApiOperation({ summary: 'Updated password' })
  @ApiResponse({ status: 200, description: 'Updated Password successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async update( @Body() updateAuthDto: UpdateAuthDto) {
    try {
        return await this.authService.updatePassword(updateAuthDto);
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
    
  }

  @Post('confirm/otp')
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async confirmOtp(@Body() dto: CONFIRMDto ) {
    return await this.authService.confirmOTP(dto);
  }
  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Returns user details and JWT token upon successful login',
    type: UserLogin,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async login(@Body() userDto: LoginDto): Promise<ResponseStatus<UserLogin>> {
    return await this.authService.login(userDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user with email and password' })
  @ApiResponse({
    status: 201,
    description:
      'Returns user details and JWT token upon successful registration',
    type: UserRegister,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async register(
    @Body() userDto: RegisterDto,
  ): Promise<ResponseStatus<UserRegister>> {
    return await this.authService.register(userDto);
  }
  
}