import { UpdateInternDto } from 'src/dtos/update-intern.dto';
import { InterfaceIntern } from './intern.interface';
import { InternDto } from 'src/dtos/intern.dto';

export interface Crud {
  findAll(): Promise<InterfaceIntern[]>;
  findOne(internId: string): Promise<InterfaceIntern>;
  add(intern: InternDto): Promise<InterfaceIntern>;
  update(internId: string, updateInternDto: UpdateInternDto): Promise<string>;
  delete(internId: string): Promise<string>;
}
