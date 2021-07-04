import { Injectable } from '@nestjs/common';
import { DebtorModel } from './models/debtor.model';
import { Repository, UpdateResult, ILike } from 'typeorm';
import { CreateDebtorDto } from './dto/create-debtor.dto';
import { FindDebtorDto } from './dto/find-debtor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtorPassportModel } from './models/debtor-passport.model';
import { CreatePassportDto } from './dto/create-passport-data.dto';
import { DEBTOR_NOT_FOUND } from './debtor.constants';
import { UpdateDebtorDto } from './dto/update-debtor.dto';
import { DebtService } from 'src/debt/debt.service';
import { Paginate } from 'src/common-entities/interfaces/paginate.interface';

@Injectable()
export class DebtorService {
  constructor(
    @InjectRepository(DebtorModel)
    private readonly debtorModel: Repository<DebtorModel>,
    @InjectRepository(DebtorPassportModel)
    private readonly debtorPassportModel: Repository<DebtorPassportModel>,
    private readonly debtService: DebtService,
  ) {}

  async createDebtor(dto: CreateDebtorDto): Promise<DebtorModel> {
    if (
      dto.number &&
      dto.series &&
      dto.dateOfIssue &&
      dto.departmentCode &&
      dto.placeOfIssue
    ) {
      const passport = await this.debtorPassportModel.create(dto).save();

      return this.debtorModel.save({ ...dto, passportData: passport });
    }

    return this.debtorModel.save(dto);
  }

  async deleteDebtorById(id: string): Promise<UpdateResult> {
    return this.debtorModel.softDelete(id);
  }

  async updateDebtorById(
    id: string,
    dto: UpdateDebtorDto,
  ): Promise<DebtorModel> {
    if (dto.debtsIds) {
      const debts = await this.debtService.findDebtsByIds(dto.debtsIds);
      return this.debtorModel.save({ id, ...dto, debts });
    }

    return this.debtorModel.save({ id, ...dto });
  }

  async addPassportToDebtorById(
    debtorId: string,
    passportData: CreatePassportDto,
  ): Promise<DebtorModel> {
    const debtor = await this.debtorModel.findOne(debtorId);

    if (!debtor) {
      throw new Error(DEBTOR_NOT_FOUND);
    }

    const passport = await this.debtorPassportModel.save(passportData);
    debtor.passportData = passport;

    return debtor.save();
  }

  async findDebtorById(id: string): Promise<DebtorModel | undefined> {
    return this.debtorModel.findOne(id);
  }

  async findDebtorByText(dto: FindDebtorDto): Promise<Paginate<DebtorModel>> {
    const [debtors, totalCountOfDebtors] = await this.debtorModel.findAndCount({
      order: { [dto.sortField as string]: dto.sortOrder },
      where: [
        { firstName: ILike(`%${dto.text}%`) },
        { lastName: ILike(`%${dto.text}%`) },
        { patronymic: ILike(`%${dto.text}%`) },
      ],
      take: dto.limit,
      skip: dto.skip,
    });

    return {
      data: debtors,
      total: totalCountOfDebtors,
      currentCount: debtors.length,
      paginate: {
        nextUrl: '',
      },
    };
  }
}
