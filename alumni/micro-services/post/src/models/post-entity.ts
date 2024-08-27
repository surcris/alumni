import { Exclude } from 'class-transformer';
import { TypePost } from 'src/emums/type-post.enum';
import { InternType } from 'src/types/intern.type';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'post',
})
export class PostEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 75, nullable: true })
  title?: string;

  @Column({ type: 'text' })
  content: string;

  /**
   * @todo move to OneToMany
   */
  @Column({ type: 'text', nullable: true })
  media?: string;

  @Column()
  postedAt: Date;

  @Column({ type: 'enum', enum: TypePost })
  type: TypePost;

  @Column({ type: 'varchar', length: 70 }) // Increase the length
  authorId: string;

  @Exclude()
  author?: InternType;
}
