/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Poe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 75})
  name: string;

  @Column()
  type: string;

  @Column({nullable: false})
  beginAt: Date

  @Column({nullable: false})
  endAt: Date
}
