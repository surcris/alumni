/* eslint-disable prettier/prettier */
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity({
    name: 'user'
})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    role: string

}
