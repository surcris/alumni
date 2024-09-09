import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constante';
import { JwtStrategy } from './jwt-strategy/jwt-strategy';

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [
		
		JwtModule.register({
			secret: jwtConstants.secret, // Clé secrète utilisée pour signer le JWT
		}),
		ClientsModule.register([
			{
				name: 'USER',
				transport: Transport.TCP,
				options: {
					host: '127.0.0.1',
					port: 3300
				}
			}
		])
	]
})
export class UserModule {}
