import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class PerformanceDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요' })
  name: string;

  @IsDate()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요' })
  datetime: Date;

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
