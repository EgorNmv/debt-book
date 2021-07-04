import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { IDebt } from '../debt.interface';
import {
  DEBT_VALIDATE_FIELD_FOR_STRING,
  DEBT_VALIDATE_FIELD_FOR_DATE,
  DEBT_VALIDATE_FIELD_FOR_NUMBER,
} from '../debt.constatns';

export class CreateDebtDto implements IDebt {
  @IsString({
    message: ({ property }) => DEBT_VALIDATE_FIELD_FOR_STRING(property),
  })
  name: string;

  @IsOptional()
  @IsString({
    message: ({ property }) => DEBT_VALIDATE_FIELD_FOR_STRING(property),
  })
  description: string;

  @IsOptional()
  @IsString({
    message: ({ property }) => DEBT_VALIDATE_FIELD_FOR_STRING(property),
  })
  note?: string;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: ({ property }) => DEBT_VALIDATE_FIELD_FOR_NUMBER(property),
    },
  )
  originalAmount?: number;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: ({ property }) => DEBT_VALIDATE_FIELD_FOR_NUMBER(property),
    },
  )
  debtAmount?: number;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: ({ property }) => DEBT_VALIDATE_FIELD_FOR_NUMBER(property),
    },
  )
  percent?: number;

  @IsOptional()
  @IsDateString(
    {},
    {
      message: ({ property }) => DEBT_VALIDATE_FIELD_FOR_DATE(property),
    },
  )
  repaymentDate?: Date;

  @IsOptional()
  @IsString({
    message: ({ property }) => DEBT_VALIDATE_FIELD_FOR_STRING(property),
  })
  debtorId?: string;
}
