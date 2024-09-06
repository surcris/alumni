/* eslint-disable prettier/prettier */
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Roles } from '../models/roles.enum';

@Entity({
    name: 'user'
})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    email: string

    @Column()
    password: string

    @Column({ type: 'enum', enum: Roles, default: Roles.Intern })
    role: Roles

}
