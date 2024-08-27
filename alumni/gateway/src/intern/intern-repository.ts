/* eslint-disable @typescript-eslint/no-unused-vars */
import { TypePost } from 'src/post/models/type-post.enum';
import { InternType } from './models/intern.type';

export class InternRepository {
  private _interns: Array<InternType> = [];

  constructor() {
    // this._populate();
  }

  findAll(): Array<InternType> {
    return this._interns;
  }

  findOne(id: number): InternType | null {
    return this._interns.find((intern) => intern.id === id);
  }

  add(intern: InternType): InternType {
    throw new Error(`Not implemented yet`);
  }

  update(intern: InternType): void {
    throw new Error(`Not implemented yet`);
  }

  delete(id: number): void {
    throw new Error(`Not implemented yet`);
  }

  /**
   * Just for mock purpose
   * Populate a list with some fixed datas (Fixture)
   */
  // private _populate(): void {
  //   this._interns.push({
  //     id: 1,
  //     lastname: 'momo',
  //     firstname: 'azer',
  //     company: {
  //       id: 1,
  //       name: 'AU BG BARBER'
  //     },
  //     poe: {
  //       id: 1,
  //       name: 'POEC Dev Mob',
  //       beginAt: new Date(2024, 5, 24),
  //       endAt: new Date(2024, 8, 24)
  //     }
  //     // post: [
  //     //   {
  //     //     id: 1,
  //     //     content: `I'm glad to be hire in this company `,
  //     //     publicationDate: new Date(2024, 6, 24, 18, 18, 0, 1),
  //     //     type: TypePost.Information,
  //     //     multimedia: '',
  //     //     idOwner: 1
  //     //   }
  //     // ]
  //   });
  //   this._interns.push({
  //     id: 2,
  //     lastname: 'lolo',
  //     firstname: 'tyui',
  //     occupation: 'kebabier',
  //     company: {
  //       id: 2,
  //       name: 'Chez le bon pote'
  //     },
  //     poe: {
  //       id: 1,
  //       name: 'POEC Dev Mob',
  //       beginAt: new Date(2024, 5, 24),
  //       endAt: new Date(2024, 8, 24)
  //     }
  //     // post: [
  //     //   {
  //     //     id: 2,
  //     //     content: `I'm so sad it's a very boring job. H E L P M E!!! `,
  //     //     publicationDate: new Date(2024, 7, 24, 18, 18, 0, 1),
  //     //     type: TypePost.Information,
  //     //     multimedia: '',
  //     //     idOwner: 2
  //     //   }
  //     // ]
  //   });
  // }
}
