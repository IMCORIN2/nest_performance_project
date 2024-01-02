import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'reservations',
})
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true, nullable: false })
  UserId: number;

  @Column({ type: 'int', unique: true, nullable: false })
  PerformanceId: number;

  @Column({ type: 'datetime', unique: true, nullable: false })
  dateTime: Date;

  @Column({ type: 'varchar', unique: true, nullable: false })
  place: string;
}
