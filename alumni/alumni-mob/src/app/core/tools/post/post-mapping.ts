import { TypePost } from '../../enums/post/type-post-enum';

export const TypePostIcons: { [key in TypePost]: string } = {
    [TypePost.Information]: 'information-circle-outline',
    [TypePost.Hiring]: 'flame-outline',
  };
  