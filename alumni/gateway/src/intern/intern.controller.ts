/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Logger, Param, Req, Res } from '@nestjs/common';
import { InternService } from './intern.service';
import { InternType } from './models/intern.type';
import { Observable, take } from 'rxjs';
import { Request, Response } from 'express';

@Controller('api/v1/intern')
export class InternController {
    constructor(
        private _service: InternService
    ) {}

    @Get() // GET http://localhost:3000/api/v1/intern
    findAll(): Observable<Array<InternType>> {
        return this._service.findAll()
            .pipe(
                take(1) // Autre façon  d'arrêter d'observer
            )
    }

    @Get(':id') // http://127.0.0.1:3000/api/v1/intern/99
    findOne(@Param('id') id: number, @Res() res: Response): void {
        
        this._service.findOne(id)
            .pipe(
                take(1)
            )
            .subscribe({
                next: (response: InternType | null) => {
                    if (response) {
                        res.status(200).send(response)
                        // Your rest of logic after response was send here
                    } else {
                        res.status(404).send()
                    }
                },
                error: (error: any) => {
                    res.status(500).send(error)
                }
            })
    }
}
