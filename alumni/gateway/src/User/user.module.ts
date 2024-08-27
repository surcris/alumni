import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [
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
