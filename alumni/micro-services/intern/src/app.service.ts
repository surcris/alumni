/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { InternType } from './models/intern.type';
import { InternRepository } from './intern-repository';

@Injectable()
export class AppService {
  constructor(
    private _repository: InternRepository
  ) {}
  
  findOne(id: number): InternType | null {
    return this._repository.findOne(id)
  }

  findAll(): Array<InternType> {
    return this._repository.findAll()
  }
}
