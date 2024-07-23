/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, Logger } from "@nestjs/common";
import { InternType } from "./models/intern.type";

@Injectable()
export class InternRepository {
    private _interns: Array<InternType> = []

    constructor() {
        this._populate()
    }

    findAll(): Array<InternType> {
        return this._interns;
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOne(id: number): InternType | null {
        const result: InternType | undefined = this._interns
            .find((intern: InternType) => intern.id == id);

        return result ? result : null

        if (result) return result
        return null
    }

    add(intern: InternType): InternType {
        throw new Error('Not implemented yet');
    }

    delete(id: number): void {}

    update(intern: InternType): void {}

    /**
     * Just for mock purpose
     * Populate a list with some fixed datas (Fixture)
     */
    private _populate(): void {
        this._interns.push({
            id: 1,
            lastname: 'Aubert',
            firstname: 'Jean-Luc',
            company: {
                id: 1,
                name: 'Aélion'
            },
            poe: {
                id: 1,
                name: 'POEC Dev Mobile',
                beginAt: new Date(2024, 5, 24),
                endAt: new Date(2024, 8, 24)
            }
        })

        this._interns.push({
            id: 2,
            lastname: 'Bebedev',
            firstname: 'Anoushka',
            company: {
                id: 2,
                name: 'Aeroflot'
            },
            poe: {
                id: 1,
                name: 'POEC Dev Mobile',
                beginAt: new Date(2024, 5, 24),
                endAt: new Date(2024, 8, 24)
            }
        })
    }
}
