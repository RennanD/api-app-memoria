import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('messages')
class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message_type: string;

  @Column()
  message_content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Message;
