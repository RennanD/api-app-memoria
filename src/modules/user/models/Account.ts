import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User';

@Entity('account')
class UserPhone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, user => user.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  phone_number: string;

  @Column()
  verification_code: string;

  @Column()
  has_verified: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserPhone;
