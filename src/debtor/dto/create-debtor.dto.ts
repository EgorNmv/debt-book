import {
  IsString,
  IsDate,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';
import {
  DEBTOR_VALIDATE_FIELD_FOR_STRING,
  DEBTOR_VALIDATE_FIELD_FOR_DATE,
  DEBTOR_VALIDATE_FIELD_FOR_NUMBER,
} from '../debtor.constants';
import { IDebtorPassport } from '../interfaces/debtor-passport.interface';
import { IDebtor } from '../interfaces/debtor.interface';

export class CreateDebtorDto implements IDebtor, Partial<IDebtorPassport> {
  @IsString({
    message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_STRING(property),
  })
  firstName: string;

  @IsString({
    message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_STRING(property),
  })
  lastName: string;

  @IsOptional()
  @IsString({
    message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_STRING(property),
  })
  patronymic?: string;

  @IsDateString(
    {},
    {
      message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_DATE(property),
    },
  )
  dateOfBirth: Date;

  @IsOptional()
  @IsString({
    message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_STRING(property),
  })
  placeOfBirth?: string;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_NUMBER(property),
    },
  )
  series?: number;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_NUMBER(property),
    },
  )
  number?: number;

  @IsOptional()
  @IsString({
    message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_STRING(property),
  })
  departmentCode?: string;

  @IsOptional()
  @IsDateString(
    {},
    {
      message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_DATE(property),
    },
  )
  dateOfIssue?: Date;

  @IsOptional()
  @IsString({
    message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_STRING(property),
  })
  placeOfIssue?: string;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_NUMBER(property),
    },
  )
  trastRaiting?: number;

  @IsOptional()
  @IsString({
    message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_STRING(property),
  })
  note?: string;
}
