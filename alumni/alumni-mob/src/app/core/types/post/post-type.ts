import { TypePost } from '../../enums/post/type-post-enum';

export type CreatePostType = {
  title?: string;
  content: string; // Description
  media?: string; //path
  postedAt: Date;
  type: TypePost;
};