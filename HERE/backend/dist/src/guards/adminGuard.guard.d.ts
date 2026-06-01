import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class AdminJwtAuthGuard implements CanActivate {
    private readonly jwtServices;
    constructor(jwtServices: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromCookies;
}
