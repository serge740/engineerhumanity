import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RequestWithAdmin } from '../common/interfaces/admin.interface';

@Injectable()
export class AdminJwtAuthGuard implements CanActivate {
  constructor(private readonly jwtServices: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithAdmin>();
    const adminToken = this.extractTokenFromCookies(request);

    if (!adminToken) {
      throw new UnauthorizedException('not authenticated');
    }
    try {
      const decodedHost = await this.jwtServices.verifyAsync(adminToken, {
        secret: process.env.Jwt_SECRET_KEY || 'secretkey',
      });

      request.admin = decodedHost;
      return true;
    } catch (error) {
      throw new UnauthorizedException('invalid or expired token');
    }
  }

  private extractTokenFromCookies(req: Request): string | undefined {
    return req.cookies?.['AccessAdminToken'];
  }
}
