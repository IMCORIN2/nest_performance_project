import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './dto/reservation.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post(':userId')
  async reservePerformance(
    @Param('userId') userId: number,
    @Body() reservationData: ReservationDto,
  ) {
    // userId auth에서 못가져오나?
    const reservedPerformance =
      await this.reservationService.reservePerformance(userId, reservationData);

    return {
      status: 201,
      message: '성공적으로 예약되었습니다.',
      data: reservedPerformance,
    };
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('me/:userId')
  async getReservation(@Param('userId') userId: number) {
    const reservation =
      await this.reservationService.getReservationByUserId(userId);

    return {
      status: 200,
      message: `${reservation.user.name}님의 예약 내역입니다.`,
      data: reservation.reservation,
    };
  }
}
