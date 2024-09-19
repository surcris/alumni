import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostDto } from 'src/dtos/post.dto';
import { PostService } from 'src/services/post.service';
import { InterfacePost } from 'src/interfaces/post.interface';

@Controller(`post`)
export class PostController {
  constructor(private _service: PostService) {}

  @MessagePattern({ cmd: 'findAll' })
  async findAll(@Payload() payload: any): Promise<Array<InterfacePost>> {
    // retourne une promesse qui sera convertie par le await
    return await this._service.findAll(payload.page);
  }

  @MessagePattern({ cmd: 'findOne' })
  async findOne(@Payload() payload: any) {
    try {
      return await this._service.findOne(payload.id);
    } catch (err) {}
  }

  @MessagePattern({ cmd: 'add' })
  async add(@Payload() postDto: PostDto) {
    try {
      return await this._service.add(postDto);
    } catch (err) {}
  }

  @MessagePattern({ cmd: 'update' })
  async update(@Payload() payload: any) {
    try {
      return await this._service.update(payload.id, payload.updateItem);
    } catch (err) {}
  }

  @MessagePattern({ cmd: 'delete' })
  async delete(@Payload() payload: any) {
    try {
      return await this._service.delete(payload.id);
    } catch (err) {}
  }

  @MessagePattern({ cmd: 'findPostsByAuthor' })
  async findPostsByAuthor(@Payload() payload: any) {
    return this._service.findPostsByAuthor(payload.authorId);
  }
}
