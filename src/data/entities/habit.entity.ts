import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import BaseEntity from './base.entity';
import { HabitHistory } from './habit-history.entity';
import { User } from './user.entity';

export enum Day {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}

export enum HabitTargetType {
    lte = 'lte',
    gte = 'gte',
    eq = 'eq',
    none = 'none'
}

interface IHabit {
    title: string,
    category: string,
    description: string,
    target?: number,
    target_type: HabitTargetType,
    start: Date,
    end: Date,
    repeat_every_day?: number,
    repeat_on?: Day[]
}

@Entity()
export class Habit extends BaseEntity implements IHabit {
    @Column()
        title: string;

    @Column()
        category: string;

    @Column()
        description: string;

    @Column({
        type: 'float',
        default: 0 
    })
        target: number;

    @Column()
        target_type: HabitTargetType;

    @Column({ default: null })
        start: Date;

    @Column({ default: null })
        end: Date;

    @Column({
        type: 'int',
        default: null
    })
        repeat_every_day: number;

    @Column({
        type: 'simple-array',
        enum: Day,
         
    })
        repeat_on: Day[];

    @OneToMany(() => HabitHistory, habitHistory => habitHistory.habit)
        history: HabitHistory[];

    @ManyToOne(() => User, user => user.habits)
        user: User[];
}