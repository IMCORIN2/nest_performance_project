import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReservationDto {
  @IsNumber()
  @IsNotEmpty({ message: '예약 날짜를 입력해주세요' })
  performanceId: number;

  @IsNotEmpty({ message: '예약할 공연 시간을 입력해주세요' })
  datetime: [string, string];

  @IsString()
  @IsNotEmpty({ message: '예약할 공연 장소를 입력해주세요' })
  place: string;
}
