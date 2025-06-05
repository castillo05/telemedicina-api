import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    console.log('AuthService: Validating user...');
    console.log('Email:', email);
    
    const user = await this.usersService.findByEmail(email);
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user || !user.isActive) {
      console.log('User not found or inactive');
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('Attempting to validate password...');
    const isPasswordValid = await user.validatePassword(password);
    console.log('Password validation result:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Invalid password');
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('User validated successfully');
    return user;
  }

  async login(user: User) {
    console.log('AuthService: Logging in user...');
    console.log('User ID:', user.id);
    console.log('User email:', user.email);
    
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    console.log('Generated JWT token');

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
} 