import { UpdatePostDto } from 'src/dtos/update-post.dto';
import { InterfacePost } from './post.interface';
import { PostDto } from 'src/dtos/post.dto';

export interface Crud {
  findAll(page: number): Promise<InterfacePost[]>;
  findOne(postId: string): Promise<InterfacePost>;
  add(post: PostDto): Promise<InterfacePost>;
  update(postId: string, updatePostDto: UpdatePostDto): Promise<string>;
  delete(postId: string): Promise<string>;
}
