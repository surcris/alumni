import { TypePost } from '../../enums/post/type-post-enum';
import { InternType } from '../intern/inter-type';


export type PostType = {
  id?: number;
  title?: string;
  content: string; // Description
  media?: string; //path
  postedAt: Date;
  type: TypePost;
  authorId: string;
  author: InternType;
};