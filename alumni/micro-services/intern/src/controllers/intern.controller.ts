import { Controller, Logger } from '@nestjs/common';
import { InternDto } from 'src/dtos/intern.dto';
import { InternService } from 'src/services/intern.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('intern')
export class InternController {
  constructor(private readonly _service: InternService) {}

  @MessagePattern({ cmd: 'findAll' })
  async findAll() {
    try {
      return await this._service.findAll();
    } catch (err) {}
  }
  
  @MessagePattern({ cmd: 'findOne' })
  async findOne(@Payload() payload: any) {
    try {
      return await this._service.findOne(payload.id);
    } catch (err) {}
  }

  @MessagePattern({ cmd: 'findOneByEmail' })
  async findOneByEmail(@Payload() payload: any) {
    Logger.log("test")
    try {
      return await this._service.findOneByEmail(payload.email);
    } catch (err) {}
  }

  @MessagePattern({ cmd: 'add' })
  async add(@Payload() internDto: InternDto) {
    try {
      return await this._service.add(internDto);
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

  @MessagePattern({ cmd: 'profile' })
  async getProfileData(@Payload() payload: any) {
    try {
      return await this._service.getProfileData(payload.id);
    } catch (err) {}
  }
}
