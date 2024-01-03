import { Performance } from 'src/performance/entities/performance.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'reservations',
})
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  UserId: number;

  @Column({ type: 'int', nullable: false })
  PerformanceId: number;

  @Column({ type: 'varchar', nullable: false })
  date: string;

  @Column({ type: 'varchar', nullable: false })
  time: string;

  @Column({ type: 'varchar', nullable: false })
  place: string;

  @ManyToOne(() => Performance)
  @JoinColumn()
  performance: Performance;

  @ManyToMany(() => User)
  @JoinColumn()
  user: User;
}
