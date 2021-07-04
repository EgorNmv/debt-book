import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtorModel } from 'src/debtor/models/debtor.model';
import { Repository } from 'typeorm';
import { DebtModel } from './debt.model';
import { In } from 'typeorm';
import { CreateDebtDto } from './dto/create-debt.dto';
import { DebtorService } from 'src/debtor/debtor.service';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(DebtorModel)
    private readonly debtorModel: Repository<DebtModel>,
    private readonly debtorService: DebtorService,
  ) {}

  async findDebtsByIds(idsList: string[]): Promise<DebtModel[]> {
    return this.debtorModel.find({ where: { id: In(idsList) } });
  }

  async createDebt(dto: CreateDebtDto): Promise<DebtModel> {
    const debt = this.debtorModel.create(dto);

    if (dto.debtorId) {
      const debtor = await
    }
    return debt.save();
  }
}
