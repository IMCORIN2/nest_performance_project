import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class SearchPerformanceDto {
  @IsString()
  @IsNotEmpty({ message: '검색어를 입력해주세요' })
  searchKeyword: string;
}
