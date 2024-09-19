import { Expose, Transform } from 'class-transformer';
import { TypePost } from '../enums/post/type-post-enum';
import { InternDTO } from '../internDto/internDto';



export class PostTransfo {
    @Expose()
    id?: string;
  
    @Expose()
    title?: string;
  
    @Expose()
    content!: string;
  
    @Expose()
    media?: string;
  
    @Expose()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    postedAt: any;
  
    @Expose()
    type?: TypePost;
  
    @Expose()
    authorId!: string;
  
    @Expose()
    author?: InternDTO;
  }