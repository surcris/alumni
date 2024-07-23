/* eslint-disable prettier/prettier */
import { InternType } from "src/intern/models/intern.type";

export type PostType = {
    id?: number;
    title?: string;
    content: string;
    media?: string;
    postedAt: Date;
    author: InternType
}