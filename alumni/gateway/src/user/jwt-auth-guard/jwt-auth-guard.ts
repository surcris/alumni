import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// On étend AuthGuard avec le type 'jwt' qui correspond à notre stratégie JWT
export class JwtAuthGuard extends AuthGuard('jwt') {}