/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InternType } from './models/intern.type';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class InternService {

    constructor(
        @Inject('INTERN') private _client: ClientProxy
    ) {
    }

    findAll(): Observable<Array<InternType>> {
        const pattern: any = {intern: 'all'};
        return this._client.send<InternType[], any>(pattern, {});
    }

    findOne(id: number): Observable<InternType | undefined> {
        const pattern: any = {intern: 'one'}
        const payload: {id: number} = {id}

        return this._client.send<InternType | undefined, any>(
            pattern,
            payload
        )
        
    }
}
