import { Entity, Column, ManyToOne } from 'typeorm';
import BaseEntity, { BaseDto } from './base.entity';
import { Habit } from './habit.entity';

export interface IHabitHistory {
    habitId: string,
    date: Date,
    value: number
}

export interface HabitHistoryDto extends IHabitHistory, BaseDto {}

@Entity()
export class HabitHistory extends BaseEntity implements IHabitHistory {
    @Column()
        date: Date;

    @Column({
        type: 'float',
        default: 0 
    })
        value: number;

    @Column({ name: 'habitId' })
        habitId: string;

    @ManyToOne(() => Habit, habit => habit.history, {
        onDelete: 'CASCADE'
    })
        habit: Habit[];

    toDomain(): HabitHistoryDto {
        return {
            id: this.id,
            habitId: this.habitId,
            date: this.date,
            value: this.value,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}