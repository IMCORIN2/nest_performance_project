import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>,
  ) {}

  async postPerformance(
    name: string,
    datetime: Date,
    place: string,
    seat: number,
    image: string,
    category: string,
  ) {
    const postedPerformance = await this.performanceRepository.save({
      name,
      datetime,
      place,
      seat,
      image,
      category,
    });

    return postedPerformance;
  }

  async getAllPerformances(): Promise<Performance[]> {
    const allPerformances = await this.performanceRepository.find({
      select: ['name', 'datetime', 'place', 'seat', 'image', 'category'],
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
