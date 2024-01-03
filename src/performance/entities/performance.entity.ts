import { Reservation } from 'src/reservation/entities/reservation.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'performances',
})
export class Performance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  date: string;

  @Column({ type: 'varchar', nullable: false })
  time: string;

  @Column({ type: 'varchar', nullable: false })
  place: string;

  @Column({ type: 'int', nullable: false })
  seat: number;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @Column({ type: 'int', default: 30000 })
  price: number;

  @OneToMany(() => Reservation, (reservation) => reservation.performance, {
    cascade: true,
  })
  @JoinColumn()
  reservation: Reservation;
}
