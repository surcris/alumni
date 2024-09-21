import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtConstants } from 'src/constante';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies["mySecureCookie"].refreshToken;
    if (!token) {
      
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secretRefresh
        }
      );
      
      // Vérification du rôle dans le token
      if (!payload.infoU.role || !['Admin', 'Intern','SuperAdmin'].includes(payload.infoU.role)) {
        // Par exemple, ici on vérifie si le rôle est 'admin'
        throw new ForbiddenException('Access denied: insufficient permissions');
      }
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      
    } catch {
      
      throw new UnauthorizedException();
    }
    return true;
  }
}
