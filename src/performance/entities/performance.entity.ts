import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'performances',
})
export class Performance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'datetime', unique: true, nullable: false })
  datetime: Date;

  @Column({ type: 'varchar', unique: true, nullable: false })
  place: string;

  @Column({ type: 'int', unique: true, nullable: false })
  seat: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  image: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  category: string;
}
