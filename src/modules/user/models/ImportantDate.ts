import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import Contact from './Contact';

@Entity('important_dates')
class ImportantDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Contact, contact => contact.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @Column()
  contact_id: string;

  @Column()
  user_id: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('time with time zone')
  deleted_at: Date;
}

export default ImportantDate;
