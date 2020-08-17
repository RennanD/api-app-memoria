import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('preferences')
class Preferences {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  person_id: string;

  @Column()
  category: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Preferences;
