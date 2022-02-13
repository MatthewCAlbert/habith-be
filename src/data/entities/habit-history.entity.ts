import { Entity, Column, ManyToOne } from 'typeorm';
import BaseEntity from './base.entity';
import { Habit } from './habit.entity';

interface IHabitHistory {
    date: Date,
    value: number
}

@Entity()
export class HabitHistory extends BaseEntity implements IHabitHistory {
    @Column()
        date: Date;

    @Column({
        type: 'float',
        default: 0 
    })
        value: number;

    @ManyToOne(() => Habit, habit => habit.history)
        habit: Habit[];
}