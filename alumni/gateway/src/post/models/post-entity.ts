import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'post'
})
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 75 })
  title: string;

  @Column()
  publicationDate: Date;

  @Column()
  content: string;

  /**
   * @todo move to OneToMany
   */
  @Column({ type: 'text' })
  multimedia: string;

  /**
   * @todo move to ManyToOne or enum
   */
  @Column()
  type: string;

  @Column()
  owner: string;
}
