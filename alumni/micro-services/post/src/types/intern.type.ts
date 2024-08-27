// import { PostType } from 'src/post/models/post.type';
// import { CompanyType } from './company.type';
// import { PoeType } from './poe.type';

// export type InternType = {
//   id?: number;
//   lastname: string;
//   firstname: string;
//   occupation?: string;
//   company: CompanyType;
//   poe: PoeType;
//   post: Array<PostType>;
// };

import { CompanyType } from './company.type';
import { PoeType } from './poe.type';

export type InternType = {
  id?: number;
  lastname: string;
  firstname: string;
  gender: string;
  emails: Array<string>;
  phoneNumber: string;
  occupation?: string;
  company: CompanyType;
  poe: PoeType;
};
