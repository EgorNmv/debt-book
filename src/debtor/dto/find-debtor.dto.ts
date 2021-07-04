import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { SortOrderEnum } from 'src/common-entities/enums/sort-order.enum';
import { IDebtor } from '../interfaces/debtor.interface';
import { DebtorModel } from '../models/debtor.model';

export class FindDebtorDto {
  @IsString()
  text: string;

  @IsOptional()
  @IsNumber()
  limit? = 100;

  @IsOptional()
  @IsNumber()
  skip?: number = 0;

  @IsOptional()
  @IsEnum(SortOrderEnum)
  sortOrder?: SortOrderEnum = SortOrderEnum.ASC;

  @IsOptional()
  // @IsIn(Object.keys(DebtorModel))
  sortField?: keyof IDebtor = 'lastName';
}
