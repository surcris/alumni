import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constante';

@Module({
	providers: [PostService],
	controllers: [PostController],
	imports: [
		JwtModule.register({
			secret: jwtConstants.secret, // Clé secrète utilisée pour signer le JWT
			signOptions: { expiresIn: '1440m' } // Facultatif : durée de validité du token
		}),
		ClientsModule.register([
			{
				name: 'POST',
				transport: Transport.TCP,
				options: {
					host: '127.0.0.1',
					port: 3200
				}
			}
		])
	]
})
export class PostModule {}
