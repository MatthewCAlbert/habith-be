import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import BaseEntity, { BaseDto } from './base.entity';
import { HabitHistory, HabitHistoryDto } from './habit-history.entity';
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

export interface IHabit {
    userId?: string,
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

export interface HabitDto extends IHabit, BaseDto {
    history?: HabitHistoryDto[]
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
        default: null
    })
        repeat_on: Day[];

    @OneToMany(() => HabitHistory, habitHistory => habitHistory.habit, {
        cascade: true
    })
        history: HabitHistory[];

    @Column({ name: 'userId' })
        userId: string;

    @ManyToOne(() => User, user => user.habits, {
        onDelete: 'CASCADE'
    })
        user: User[];

    toDomain(): HabitDto {
        const history = this.history?.map( e => e.toDomain() );

        return {
            id: this.id,
            userId: this.userId,
            title: this.title,
            category: this.category,
            description: this.description,
            target: this.target,
            target_type: this.target_type,
            start: this.start,
            end: this.end,
            repeat_every_day: this.repeat_every_day,
            repeat_on: this.repeat_on?.map( day => parseInt(String(day)) ),
            ...(history && { history }),
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}