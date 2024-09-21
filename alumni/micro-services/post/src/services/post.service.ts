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


/**
 * The `PostService` class provides methods for managing posts, including creating, updating,
 * deleting, and retrieving posts. It integrates with external services to fetch additional
 * author (intern) information and supports paginated retrieval of posts.
 * 
 * This class relies on a repository for database operations and communicates with 
 * a microservice to retrieve intern (author) data for posts.
 * 
 * Key Responsibilities:
 * - Fetch posts (single or multiple) from the repository.
 * - Update, add, and delete posts by their ID.
 * - Merge additional intern (author) data into posts.
 * 
 * Methods:
 * - `findAll(page: number): Promise<Array<InterfacePost>>`: Fetches paginated posts.
 * - `findOne(postId: string): Promise<InterfacePost>`: Retrieves a single post by its ID.
 * - `add(post: PostDto): Promise<InterfacePost>`: Adds a new post to the repository.
 * - `update(postId: string, updatePostDto: UpdatePostDto): Promise<string>`: Updates an existing post.
 * - `delete(postId: string): Promise<string>`: Deletes a post by its ID.
 * - `mergedPostAndIntern(post: PostEntity): Promise<PostEntity>`: Merges intern data into a post.
 * - `findIntern(id: string): Observable<InternType>`: Fetches intern data from an external service.
 */
@Injectable()
export class PostService implements Crud {
  constructor(
    @InjectRepository(PostEntity)
    private _repository: Repository<PostEntity>,
    @Inject('INTERN') private _client: ClientProxy,
  ) { }
  
  /**
    * Retrieves a paginated list of posts, sorted by the posted date in descending order.
    * Each post is processed through the `mergedPostAndIntern` method for further enrichment.
    * 
    * @param {number} page - The page number for pagination. Each page contains 50 posts.
    * @returns {Promise<Array<InterfacePost>>} - A promise that resolves to an array of updated posts.
    * 
    * @throws {NotFoundException} - Throws an exception if no posts are found for the requested page.
    * 
    * The pagination logic uses `skip` and `take` to fetch the appropriate posts for the requested page:
    * - `skip`: Skips posts based on the page number (e.g., 50 * page).
    * - `take`: Limits the result to 50 posts per page.
    * 
    * After fetching the posts, it processes each post using the `mergedPostAndIntern` method,
    * which retrieves and add author (intern) data associated to each post before returning the final array.
 */
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
        post = await this.mergedPostAndIntern(post);
        return post;
      }),
    );

    return updatedPostData;
  }
  /**
    * Retrieves a single post by its ID and merges author data using the `mergedPostAndIntern` method.
    * 
    * @param {string} postId - The ID of the post to retrieve.
    * @returns {Promise<InterfacePost>} - A promise that resolves to the found and processed post.
    * 
    * @throws {NotFoundException} - Throws an exception if no post is found with the given ID.
    * 
    * This method first attempts to find the post in the repository by converting the `postId` to a number.
    * If no post is found, it throws a `NotFoundException` with an appropriate error message.
    * Upon successfully retrieving the post, it enriches the post data using the `mergedPostAndIntern` method before returning it.
 */
  async findOne(postId: string): Promise<InterfacePost> {
    const existingPost = await this._repository.findOne({
      where: { id: Number(postId) },
    });
    if (!existingPost) {
      throw new NotFoundException(`Post #${postId} not found`);
    }
    return this.mergedPostAndIntern(existingPost);
  }

  /**
     * Adds a new post to the dababase.
     * 
     * @param {PostDto} post - The post data transfer object (DTO) containing the data for the new post.
     * @returns {Promise<InterfacePost>} - A promise that resolves to the saved post.
     * 
     * @throws {Error} - Throws an error if the post cannot be saved to the database.
     * 
     * This method creates a new post entity from the provided `post` DTO using the ORM's `create` method.
     * It then attempts to save the post to the database using the `save` method. If the post is successfully saved,
     * it returns the saved post. If an error occurs during saving, the error is logged to the console and rethrown.
 */

  async add(post: PostDto): Promise<InterfacePost> {
    const newPost = this._repository.create(post);
    try {
      const savedPost = await this._repository.save(newPost);
      return this.mergedPostAndIntern(savedPost);
    } catch (error) {
      console.error('Error saving post:', error);
      throw error;
    }
  }
  /**
     * Updates an existing post by its ID with the provided data.
     * 
     * @param {string} postId - The ID of the post to update.
     * @param {UpdatePostDto} updatePostDto - The data transfer object (DTO) containing the new values (partial data) for the post.
     * @returns {Promise<string>} - A promise that resolves to a success message indicating the post was updated.
     * 
     * @throws {NotFoundException} - Throws an exception if no post is found with the given ID.
     * @throws {Error} - Throws any other errors that occur during the update process.
     * 
     * This method attempts to update an existing post using the post ID and the new partial data provided in the `updatePostDto`.
     * If the post is found and updated successfully, it returns a success message. If the post is not found,
     * a `NotFoundException` is thrown. If any other error occurs during the process, the error is logged and rethrown.
  */
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
  /**
   * Deletes a post by its ID from the database.
   * 
   * @param {string} postId - The ID of the post to delete.
   * @returns {Promise<string>} - A promise that resolves to a success message indicating the post was deleted.
   * 
   * @throws {NotFoundException} - Throws an exception if no post is found with the given ID.
   * 
   * This method attempts to delete a post using its ID. If the post is successfully deleted, 
   * it returns a success message. If the post is not found, a `NotFoundException` is thrown.
 */
  async delete(postId: string): Promise<string> {
    const deletedPost = await this._repository.delete({ id: Number(postId) });
    if (!deletedPost) {
      throw new NotFoundException(`Intern #${postId} not found`);
    }
    return `Intern #${postId} deleted`;
  }
  /**
   * Merges additional data (intern information) into the given post by fetching the author's information.
   * 
   * @param {PostEntity} post - The post entity that requires additional intern information based on `authorId`.
   * @returns {Promise<PostEntity>} - A promise that resolves to the post with merged intern (author) data.
   * 
   * @throws {NotFoundException} - Throws an exception if the intern (author) associated with the post cannot be found.
   * 
   * This method fetches the intern (author) data associated with the post using the `authorId`.
   * If the data is successfully retrieved, it merges the intern data into the `author` field of the post.
   * If the intern cannot be found, a `NotFoundException` is thrown with the `authorId` and the error.
 */
  private async mergedPostAndIntern(post: PostEntity) {
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

  /**
   * Sends a request to find an intern by ID via an external microservice.
   * 
   * @param {string} id - The ID of the intern to find.
   * @returns {Observable<InternType>} - An observable that will emit the intern data when the response is received.
   * 
   * This method constructs a request pattern `{ cmd: 'findOne' }` and sends it along with the `id` 
   * of the intern to the microservice using the `_client.send` method. The microservice is expected to respond
   * with the data of the intern that matches the provided ID.
 */
  private findIntern(id: string): Observable<InternType> {
    const pattern = { cmd: 'findOne' };
    return this._client.send<InternType>(pattern, { id });
  }

  /**
   * TODO
   * @param authorId 
   * @returns 
   */
  async findPostsByAuthor(authorId: string): Promise<Array<InterfacePost>> {
    const postData = await this._repository.find({
      where: { authorId: authorId },
      order: { postedAt: 'DESC' },
    });
    if (!postData || postData.length === 0)
      // throw new NotFoundException('Posts for this author not found!');
      return [] 
    return postData
  }

}
