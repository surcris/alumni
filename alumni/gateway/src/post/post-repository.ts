/* eslint-disable @typescript-eslint/no-unused-vars */
import { PostType } from './models/post.type';
import { TypePost } from './models/type-post.enum';

export class PostRepository {
  private _posts: Array<PostType> = [];

  constructor() {
    // this._populate();
  }

  findAll(): Array<PostType> {
    return this._posts;
  }

  findOne(id: number): PostType | null {
    return this._posts.find((intern) => intern.id === id);
  }

  add(post: PostType): PostType {
    throw new Error(`Not implemented yet`);
  }

  update(post: PostType): void {
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
  //   this._posts.push({
  //     id: 1,
  //     title: `TESTTTTTTTT`,
  //     content: `I'm glad to be hire in this company `,
  //     publicationDate: new Date(2024, 7, 24, 18, 18, 0, 1),
  //     owner: {
  //       id: 1,
  //       lastname: 'momo',
  //       firstname: 'azer',
  //       company: {
  //         id: 1,
  //         name: 'AU BG BARBER'
  //       },
  //       poe: {
  //         id: 1,
  //         name: 'POEC Dev Mob',
  //         beginAt: new Date(2024, 5, 24),
  //         endAt: new Date(2024, 8, 24)
  //       }
  //     }
  //   });
  //   this._posts.push({
  //     id: 2,
  //     content: `I'm so sad it's a very boring job. H E L P M E!!! `,
  //     publicationDate: new Date(2024, 7, 24, 19, 18, 0, 1),
  //     owner: {
  //       id: 2,
  //       lastname: 'lolo',
  //       firstname: 'tyui',
  //       occupation: 'kebabier',
  //       company: {
  //         id: 2,
  //         name: 'Chez le bon pote'
  //       },
  //       poe: {
  //         id: 1,
  //         name: 'POEC Dev Mob',
  //         beginAt: new Date(2024, 5, 24),
  //         endAt: new Date(2024, 8, 24)
  //       }
  //     }
  //   });
  //   this._posts.push({
  //     id: 3,
  //     content: `I have no idea `,
  //     publicationDate: new Date(2024, 7, 24, 20, 18, 0, 1),
  //     owner: {
  //       id: 2,
  //       lastname: 'lolo',
  //       firstname: 'tyui',
  //       occupation: 'kebabier',
  //       company: {
  //         id: 2,
  //         name: 'Chez le bon pote'
  //       },
  //       poe: {
  //         id: 1,
  //         name: 'POEC Dev Mob',
  //         beginAt: new Date(2024, 5, 24),
  //         endAt: new Date(2024, 8, 24)
  //       }
  //     }
  //   });
  // }
}
