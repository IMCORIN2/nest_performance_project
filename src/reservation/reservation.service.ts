import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { User } from 'src/user/entities/user.entity';
import { Performance } from 'src/performance/entities/performance.entity';
import { ReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,

    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async reservePerformance(userId: number, reservationData: ReservationDto) {
    const { performanceId, datetime, place } = reservationData;
    const [date, time] = datetime;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    const performance = await this.performanceRepository.findOne({
      where: { id: performanceId },
    }); //find - 배열로 가져옴, findOne, findOneBy는 객체로 가져옴

    if (!performance) {
      throw new ForbiddenException('존재하지 않는 공연입니다.');
    }

    if (performance.date !== date) {
      throw new ForbiddenException('해당 날짜에는 공연이 존재하지 않습니다.');
    }

    if (performance.time !== time) {
      throw new ForbiddenException('해당 시간에는 공연이 존재하지 않습니다.');
    }
    if (performance.place !== place) {
      throw new ForbiddenException('일치하는 공연 장소가 없습니다.');
    }
    if (!performance.seat) {
      throw new BadRequestException('예약이 가득 찬 공연입니다.');
    }
    console.log('1');

    //performnace 공연 좌석 수 차감
    const newSeatValue = (await performance.seat) - 1;
    const updatedPerformance = await this.performanceRepository.update(
      performanceId,
      {
        seat: newSeatValue,
      },
    );

    // user 포인트 차감
    const newPoint = (await user.point) - performance.price;
    const updatedUser = await this.userRepository.update(userId, {
      point: newPoint,
    });

    // 예약 정보 db에 넣기
    const reservation = await this.reservationRepository.save({
      UserId: userId,
      PerformanceId: performanceId,
      date,
      time,
      place,
    });
  }

  async getReservationByUserId(userId: number) {
    const reservation = await this.verifyReservationById(userId);
    // reservation.sort((a, b) => b.dateTime - a.dateTime);

    return reservation;
  }

  private async verifyReservationById(id: number) {
    const reservation = await this.reservationRepository.find({
      where: { UserId: id },
      order: { date: 'desc', time: 'desc' },
    });
    if (_.isNil(reservation)) {
      throw new NotFoundException('내 예약이 존재하지 않습니다.');
    }

    const user = await this.userRepository.findOne({ where: { id } });
    const reservationAndUser = { reservation, user };
    return reservationAndUser;
  }
}
