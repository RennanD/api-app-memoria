import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // OneToMany,
} from 'typeorm';

// import ImportantDate from './ImportantDate';
// import Contact from './Contact';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column('time with time zone')
  birthday: Date;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @Column()
  gender: string;

  @Column()
  zipcode: string;

  @Column()
  address: string;

  @Column()
  role: string;

  // @OneToMany(() => ImportantDate, date => date, { eager: true })
  // dates: ImportantDate[];

  // @OneToMany(() => Contact, contact => contact, { eager: true })
  // contacts: Contact[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('time with time zone')
  deleted_at: Date;
}

export default User;
