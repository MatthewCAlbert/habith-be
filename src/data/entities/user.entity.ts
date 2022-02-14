import { Entity, Column, OneToMany } from 'typeorm';
import BaseEntity, { BaseDto } from './base.entity';
import { Habit, HabitDto } from './habit.entity';

interface IUser {
    username: string;
    email: string;
    name: string;
    hash: string;
    salt: string;
}

export interface UserDto extends IUser, BaseDto {
    habits?: HabitDto[]
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

    @OneToMany(() => Habit, habit => habit.user, {
        cascade: true
    })
        habits: Habit[];

    toDomain() {
        return {
            id: this.id,
            username: this.username,
            name: this.name,
            email: this.email,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}