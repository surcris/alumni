/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crud } from 'src/interfaces/crud.interface';
import { PostEntity } from 'src/models/post-entity';
import { InterfacePost } from 'src/interfaces/post.interface';
import { UpdatePostDto } from 'src/dtos/update-post.dto';
import { PostDto } from 'src/dtos/post.dto';
import { InternType } from 'src/types/intern.type';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class PostService implements Crud {
  constructor(
    @InjectRepository(PostEntity)
    private _repository: Repository<PostEntity>,
    @Inject('INTERN') private _client: ClientProxy,
  ) {}

  async findAll(page: number): Promise<Array<InterfacePost>> {
    const postData = await this._repository.find({
      order: {
        postedAt: 'DESC',
      },
      skip: 50 * page,
      take: 50,
    });
    if (!postData || postData.length == 0) {
      throw new NotFoundException('Posts data not found!');
    }
    const updatedPostData = await Promise.all(
      postData.map(async (post) => {
        post = await this.fusionningPostAndIntern(post);
        return post;
      }),
    );

    return updatedPostData;
  }

  async findOne(postId: string): Promise<InterfacePost> {
    const existingPost = await this._repository.findOne({
      where: { id: Number(postId) },
    });
    if (!existingPost) {
      throw new NotFoundException(`Post #${postId} not found`);
    }
    return this.fusionningPostAndIntern(existingPost);
  }

  async add(post: PostDto): Promise<InterfacePost> {
    const newPost = this._repository.create(post);
    try {
      const savedPost = await this._repository.save(newPost);
      return savedPost;
    } catch (error) {
      console.error('Error saving post:', error);
      throw error;
    }
  }

  async update(postId: string, updatePostDto: UpdatePostDto): Promise<string> {
    try {
      const existingPost = await this._repository.update(
        { id: Number(postId) },
        updatePostDto,
      );
      if (!existingPost) {
        throw new NotFoundException(`Post #${postId} not found`);
      }
      return `Post #${postId} updated`;
    } catch (error) {
      console.error('Error saving post:', error);
      throw error;
    }
  }

  async delete(postId: string): Promise<string> {
    const deletedPost = await this._repository.delete({ id: Number(postId) });
    if (!deletedPost) {
      throw new NotFoundException(`Intern #${postId} not found`);
    }
    return `Intern #${postId} deleted`;
  }

  private async fusionningPostAndIntern(post: PostEntity) {
    try {
      const response = await firstValueFrom(this.findIntern(post.authorId));
      if (response) {
        post.author = response;
      }
    } catch (error) {
      throw new NotFoundException(`Intern #${post.authorId} not found` + error);
    }
    return post;
  }

  private findIntern(id: string): Observable<InternType> {
    const pattern = { cmd: 'findOne' };
    return this._client.send<InternType>(pattern, { id });
  }
}
