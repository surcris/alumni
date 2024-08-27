// import { TypePost } from './type-post.enum';

// export type PostType = {
//   id?: number;
//   multimedia: string; //path
//   content: string; // Description
//   publicationDate: Date;
//   type: TypePost;
//   idOwner: number;
// };

import { TypePost } from 'src/emums/type-post.enum';
import { InternType } from './intern.type';

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
