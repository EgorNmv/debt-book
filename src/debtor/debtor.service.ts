import { Injectable } from '@nestjs/common';
import { DebtorModel } from './debtor.model';
import { Repository } from 'typeorm';
import { CreateDebtorDto } from './dto/create-debtor.dto';
import { FindDebtorDto } from './dto/find-debtor.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DebtorService {
  constructor(
    @InjectRepository(DebtorModel)
    private readonly debtorModel: Repository<DebtorModel>,
  ) {}

  async create(dto: CreateDebtorDto): Promise<DebtorModel> {
    return this.debtorModel.create(dto);
  }

  async delete(id: string) {
    return this.debtorModel.delete(id);
  }

  async findDebtorByText(dto: FindDebtorDto): Promise<DebtorModel[]> {
    return this.debtorModel.find({
      order: { lastName: dto.sortOrder },
      where: { lastName: dto.text },
    });
  }
}
