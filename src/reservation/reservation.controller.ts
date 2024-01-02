import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './dto/reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // 로그인된 사용자만 접근할 수 있게 하는 데코레이터 없나
  @Post()
  async reservePerformance(
    @Body() reservationData: ReservationDto,
    @Param('userId') userId: number,
  ) {
    // userId auth에서 못가져오나?

    const reservedPerformance =
      await this.reservationService.reservePerformance(
        userId,
        reservationData.performanceId,
        reservationData.dateTime,
        reservationData.place,
      );

    return {
      status: 201,
      message: '성공적으로 예약되었습니다.',
      data: reservedPerformance,
    };
  }

  // 로그인된 사용자만 접근할 수 있게 하는 데코레이터 없나
  @Get('me')
  async getReservation(@Param('userId') userId: number) {
    const reservation =
      await this.reservationService.getReservationByUserId(userId);

    return {
      status: 200,
      message: `${userId}님의 예약 내역입니다.`,
      data: reservation,
    };
  }
}
