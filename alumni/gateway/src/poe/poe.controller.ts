import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoeService } from './poe.service';
import { CreatePoeDto } from './dto/create-poe.dto';
import { UpdatePoeDto } from './dto/update-poe.dto';

@Controller('poe')
export class PoeController {
  constructor(private readonly poeService: PoeService) {}

  @Post()
  create(@Body() createPoeDto: CreatePoeDto) {
    return this.poeService.create(createPoeDto);
  }

  @Get()
  findAll() {
    return this.poeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoeDto: UpdatePoeDto) {
    return this.poeService.update(+id, updatePoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.poeService.remove(+id);
  }
}
