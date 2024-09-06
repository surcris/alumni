import { Module } from '@nestjs/common';
import { InternService } from './intern.service';
import { InternController } from './intern.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constante';

@Module({
	providers: [InternService],
	controllers: [InternController],
	imports: [
		JwtModule.register({
			secret: jwtConstants.secret, // Clé secrète utilisée pour signer le JWT
			signOptions: { expiresIn: '1440m' } // Facultatif : durée de validité du token
		}),
		ClientsModule.register([
			{
				name: 'INTERN',
				transport: Transport.TCP,
				options: {
					host: '127.0.0.1',
					port: 3100
				}
			}
		])
	]
})
export class InternModule {}
