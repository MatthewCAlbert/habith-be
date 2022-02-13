import { Entity, Column, OneToMany } from 'typeorm';
import BaseEntity from './base.entity';
import { Habit } from './habit.entity';

interface IUser {
    username: string;
    email: string;
    name: string;
    hash: string;
    salt: string;
}

@Entity()
export class User extends BaseEntity implements IUser {
    @Column({ unique: true })
        username: string;

    @Column({ unique: true })
        email: string;

    @Column()
        name: string;

    @Column()
        hash: string;

    @Column()
        salt: string;

    @OneToMany(() => Habit, habit => habit.user)
        habits: Habit[];
}