import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Reservation } from './entities/reservation.entity';
import { Performance } from 'src/performance/entities/performance.entity';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
  imports: [TypeOrmModule.forFeature([User, Reservation, Performance])], //service에서 쓴 파일들을
})
export class ReservationModule {}
