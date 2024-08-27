import { TypePost } from 'src/emums/type-post.enum';
import { InternType } from 'src/types/intern.type';

export interface InterfacePost {
  id?: number;
  title?: string;
  content: string; // Description
  media?: string; //path
  postedAt: Date;
  type: TypePost;
  authorId: string;
  author?: InternType;
}
