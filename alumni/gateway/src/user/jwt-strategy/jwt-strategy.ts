import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from 'src/constante';

@Injectable()
// On étend la classe PassportStrategy avec la stratégie 'jwt'
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // On extrait le JWT à partir du header Authorization (Bearer token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // On ne permet pas de tokens expirés
      secretOrKey: jwtConstants.secret, // Clé secrète pour vérifier le JWT
    });
  }

  // Cette méthode est appelée après la validation du token
  async validate(payload: any) {
    // informations contenu dans le token
    return { userId: payload.sub, email: payload.email };
  }
}
