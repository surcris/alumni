// import { TypePost } from './type-post.enum';

// export type PostType = {
//   id?: number;
//   multimedia: string; //path
//   content: string; // Description
//   publicationDate: Date;
//   type: TypePost;
//   idOwner: number;
// };

import { InternType } from 'src/intern/models/intern.type';
import { TypePost } from './type-post.enum';

export type PostType = {
  id?: number;
  title?: string;
  content: string; // Description
  media?: string; //path
  postedAt: Date;
  type: TypePost;
  authorId: InternType['_id'];
};
