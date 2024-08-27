import { Injectable } from '@nestjs/common';
import { InternType } from './models/intern.type';

@Injectable()
export class AppService {
  private _interns: Array<InternType> = [];

  constructor() {
    this._populate();
  }
  getHelloR(): string {
    return 'Hello RENAUD!!!!!!!!!!!';
  }
  findOne(id: number): InternType | null {
    const result: InternType | undefined = this._interns.find(
      (intern: InternType) => intern.id == id,
    ); // === vérifie valeur et type | == vérifié juste la valeur
    return result ? result : null;
  }

  /**
   * Just for mock purpose
   * Populate a list with some fixed datas (Fixture)
   */
  private _populate(): void {
    this._interns.push({
      id: 1,
      lastname: 'momo',
      firstname: 'azer',
      company: {
        id: 1,
        name: 'AU BG BARBER',
      },
      poe: {
        id: 1,
        name: 'POEC Dev Mob',
        beginAt: new Date(2024, 5, 24),
        endAt: new Date(2024, 8, 24),
      },
    });
    this._interns.push({
      id: 2,
      lastname: 'lolo',
      firstname: 'tyui',
      occupation: 'kebabier',
      company: {
        id: 2,
        name: 'Chez le bon pote',
      },
      poe: {
        id: 1,
        name: 'POEC Dev Mob',
        beginAt: new Date(2024, 5, 24),
        endAt: new Date(2024, 8, 24),
      },
    });
  }
}
