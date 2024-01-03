import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { PerformanceDto } from './dto/performance.dto';
import { Performance } from './entities/performance.entity';
@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>,
  ) {}

  async postPerformance(performanceData: PerformanceDto) {
    const { name, datetime, place, seat, image, category } = performanceData;

    const [date, time] = datetime;
    const postedPerformance = await this.performanceRepository.save({
      name,
      date,
      time,
      place,
      seat,
      image,
      category,
    });

    return postedPerformance;
  }

  async getAllPerformances(): Promise<Performance[]> {
    const allPerformances = await this.performanceRepository.find({
      select: {
        name: true,
        date: true,
        time: true,
        place: true,
        seat: true,
        image: true,
        category: true,
      },
    });

    return allPerformances;
  }

  async searchPerformance(searchKeyword): Promise<Performance[]> {
    const searchedPerformances = await this.performanceRepository
      .createQueryBuilder('performance')
      .where('performance.name LIKE :keyword', {
        keyword: `%${searchKeyword}%`,
      })
      .orWhere('performance.place LIKE :keyword', {
        keyword: `%${searchKeyword}%`,
      })
      .orWhere('performance.category LIKE :keyword', {
        keyword: `%${searchKeyword}%`,
      })
      .getMany();

    if (searchedPerformances.length === 0) {
      throw new NotFoundException('검색 결과가 존재하지 않습니다.');
    }

    return searchedPerformances;
  }

  async getPerformance(id: number) {
    return await this.verifyPerformanceById(id);
  }

  private async verifyPerformanceById(id: number) {
    const performance = await this.performanceRepository.findOneBy({ id });
    if (_.isNil(performance)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return performance;
  }
}
