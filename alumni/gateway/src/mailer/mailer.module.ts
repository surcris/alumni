import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constante';
import { UserService } from 'src/user/user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [MailerController],
  providers: [MailerService,UserService],
  imports:[
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
export class MailerModule {}
