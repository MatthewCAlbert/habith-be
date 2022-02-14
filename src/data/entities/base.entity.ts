import { CreateDateColumn,UpdateDateColumn, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, BaseEntity } from 'typeorm';

export interface BaseDto {
    id?: string,
    created_at?: Date,
    updated_at?: Date
}
abstract class BaseModelEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
        id: string;
  
    @CreateDateColumn()
        created_at: Date;
    @UpdateDateColumn()
        updated_at: Date;
}

export default BaseModelEntity;