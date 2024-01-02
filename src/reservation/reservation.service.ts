import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { User } from 'src/user/entities/user.entity';
import { Performance } from 'src/performance/entities/performance.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    @InjectRepository(Performance)
    private readonly PerformanceRepository: Repository<Performance>,
  ) {}

  async reservePerformance(
    userId: number,
    performanceId: number,
    dateTime: Date,
    place: string,
  ) {
    const reservation = await this.reservationRepository.save({
      UserId: userId,
      PerformanceId: performanceId,
      dateTime,
      place,
    });

    // user 포인트 차감
    const user = await this.UserRepository.findOne({ where: { id: userId } });

    const newPoint = (await user.point) - 300;
    const updatedUser = await this.UserRepository.update(userId, {
      point: newPoint,
    });

    //performnace 공연 좌석 수 차감]
    const performance = await this.PerformanceRepository.findOne({
      where: { id: performanceId },
    }); //find - 배열로 가져옴, findOne, findOneBy는 객체로 가져옴

    if (!performance.seat) {
      throw new BadRequestException('예약이 가득 찬 공연입니다.');
    }
    const newSeatValue = (await performance.seat) - 1;
    const updatedPerformance = await this.PerformanceRepository.update(
      performanceId,
      {
        seat: newSeatValue,
      },
    );
  }

  async getReservationByUserId(userId: number) {
    const reservation = await this.verifyReservationById(userId);
    // reservation.sort((a, b) => b.dateTime - a.dateTime);

    return reservation;
  }

  private async verifyReservationById(id: number) {
    const reservation = await this.reservationRepository.find({
      where: { id },
      order: { dateTime: 'desc' },
    });
    if (_.isNil(reservation)) {
      throw new NotFoundException('내 예약이 존재하지 않습니다.');
    }

    return reservation;
  }
}
