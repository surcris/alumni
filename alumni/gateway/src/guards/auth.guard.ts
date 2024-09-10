import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
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
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      Logger.log("err")
      throw new UnauthorizedException();
    }
    try {
      Logger.log("Try catch")
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      // Vérification du rôle dans le token
      if (!payload.infoU.role || !['Admin', 'Intern','SuperAdmin'].includes(payload.infoU.role)) {
        // Par exemple, ici on vérifie si le rôle est 'admin'
        Logger.log(payload.infoU.role)
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

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // Logger.log(token)
    return type === 'Bearer' ? token : undefined; 
  }
}
