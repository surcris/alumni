import { Module } from '@nestjs/common';
import { PoeService } from './poe.service';
import { PoeController } from './poe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poe } from './entities/poe.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constante';

@Module({
  imports: [TypeOrmModule.forFeature([Poe]),
  JwtModule.register({
    secret: jwtConstants.secret, // Clé secrète utilisée pour signer le JWT
    signOptions: { expiresIn: '1440m' } // Facultatif : durée de validité du token
  }),],
  controllers: [PoeController],
  providers: [PoeService],
})
export class PoeModule {}
