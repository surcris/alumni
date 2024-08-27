import { Inject, Injectable } from '@nestjs/common';
import { InternType } from './models/intern.type';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class InternService {
  constructor(@Inject('INTERN') private _client: ClientProxy) {}

  findAll(): Observable<Array<InternType>> {
    const pattern = { cmd: 'findAll' };
    return this._client.send<InternType[]>(pattern, {});
  }

  findOne(id: string): Observable<InternType> {
    const pattern = { cmd: 'findOne' };
    return this._client.send<InternType>(pattern, { id });
  }

  add(intern: InternType): Observable<InternType> {
    const pattern = { cmd: 'add' };
    return this._client.send<InternType>(pattern, intern);
  }

  update(payload: any): Observable<string> {
    const pattern = { cmd: 'update' };
    return this._client.send<string>(pattern, payload);
  }

  delete(id: string): Observable<string> {
    const pattern = { cmd: 'delete' };
    return this._client.send<string>(pattern, { id });
  }
}
