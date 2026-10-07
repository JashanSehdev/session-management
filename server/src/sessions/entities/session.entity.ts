import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity.js';

@Entity('Session')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  userId: number;

  @Column({ type: 'jsonb', nullable: true })
  payload: any;

  @Column({ type: 'boolean' })
  isActive: boolean;

  @Column({type : 'integer', nullable: true})
  token : number | null

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user.sessions)
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @BeforeInsert()
  setExpiration() {
    const DEFAULT_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000; 
    this.expiresAt = new Date(Date.now() + DEFAULT_EXPIRATION_MS);
  }
}
