/* eslint-disable prettier/prettier */
import { PostType } from "./models/post.type";

export class PostRepository {
    private _posts: Array<PostType> = [];

    constructor() {
        this._populate();
    }

    findAll(): Array<PostType> {
        return this._posts
    }

    private _populate(): void {
        this._posts.push({
            id: 1,
            title: 'Post test 1',
            content: 'Post content 1',
            postedAt: new Date(2024, 6, 10),
            author: {
                id: 1,
                lastname: 'Aubert',
                firstname: 'Jean-Luc',
                occupation: 'Formateur',
                company: {
                    id: 1,
                    name: 'Aélion'
                },
                poe: {
                    id: 1,
                    name: 'POE Dev Mobile',
                    beginAt: new Date(2024, 5, 24),
                    endAt: new Date(2024, 8, 24)
                }
            }
        },
        {
            id: 2,
            title: 'Post test 2',
            content: 'Post content 2',
            postedAt: new Date(2024, 6, 9),
            author: {
                id: 1,
                lastname: 'Ngamba',
                firstname: 'Boris',
                company: {
                    id: 1,
                    name: 'Aélion'
                },
                poe: {
                    id: 1,
                    name: 'POE Dev Mobile',
                    beginAt: new Date(2024, 5, 24),
                    endAt: new Date(2024, 8, 24)
                }
            }
        })
    }
}
