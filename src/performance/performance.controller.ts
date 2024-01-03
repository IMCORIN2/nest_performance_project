import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { PerformanceDto } from './dto/performance.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/userRole.type';
// import { SearchPerformanceDto } from './dto/searchPerformance.dto';

@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Roles(Role.Admin)
  @Post()
  async postPerformance(@Body() performanceData: PerformanceDto) {
    const postedPerformance =
      await this.performanceService.postPerformance(performanceData);

    return {
      status: 201,
      message: '성공적으로 공연 등록이 완료되었습니다.',
      date: postedPerformance,
    };
  }

  @Get()
  async getAllPerformances() {
    const allPerformances = await this.performanceService.getAllPerformances();

    return {
      status: 200,
      message: '전체 공연 조회에 성공했습니다.',
      data: allPerformances,
    };
  }

  @Get('search')
  async searchPerformance(@Query('keyword') searchKeyword: string) {
    console.log(searchKeyword);
    const searchedPerformances =
      await this.performanceService.searchPerformance(searchKeyword);

    return {
      status: 200,
      message: `${searchKeyword}로 검색한 결과입니다.`,
      data: searchedPerformances,
    };
  }

  @Get(':id')
  async getPerformance(@Param('id') id: number) {
    const performance = await this.performanceService.getPerformance(id);

    return {
      status: 200,
      message: '상세정보 조회에 성공했습니다.',
      data: performance,
    };
  }
}
