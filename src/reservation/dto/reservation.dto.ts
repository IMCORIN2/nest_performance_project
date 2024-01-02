import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReservationDto {
  @IsNumber()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요' })
  performanceId: number;

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요' })
  dateTime: Date;

  @IsString()
  @IsNotEmpty({ message: '총 좌석 수를 입력해주세요' })
  place: string;
}
