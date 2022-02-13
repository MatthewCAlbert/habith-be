import { CreateDateColumn,UpdateDateColumn, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate,BaseEntity } from 'typeorm';

abstract class BaseModelEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
        id: string;
  
    @CreateDateColumn()
        created_at: Date;
    @UpdateDateColumn()
        updated_at: Date;
}

export default BaseModelEntity;