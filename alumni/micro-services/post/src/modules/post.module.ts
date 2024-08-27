import { Module } from '@nestjs/common';
import { PostController } from 'src/controllers/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/models/post-entity';
import { PostService } from 'src/services/post.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    ClientsModule.register([
      {
        name: 'INTERN',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3100,
        },
      },
    ]),
  ],
})
export class PostModule {}
