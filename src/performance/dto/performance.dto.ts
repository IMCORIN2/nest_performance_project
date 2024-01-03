import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
// import { OmitType } from '@nestjs/mapped-types';
export class PerformanceDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요' })
  name: string;

  @IsNotEmpty({ message: '공연 날짜 또는 시간을 입력해주세요' })
  datetime: [string, string];

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요' })
  place: string;

  @IsNumber()
  @IsNotEmpty({ message: '총 좌석 수를 입력해주세요' })
  seat: number;

  @IsString()
  @IsNotEmpty({ message: '이미지 경로를 입력해주세요' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: '카테고리를 입력해주세요' })
  category: string;
}
// export class PerformanceDto extends OmitType(Performance, ['id']) {

// }
