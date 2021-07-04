import { IsString, IsDate, IsNumber, IsDateString } from 'class-validator';
import {
  DEBTOR_VALIDATE_FIELD_FOR_STRING,
  DEBTOR_VALIDATE_FIELD_FOR_DATE,
  DEBTOR_VALIDATE_FIELD_FOR_NUMBER,
} from '../debtor.constants';
import { IDebtorPassport } from '../interfaces/debtor-passport.interface';

export class CreatePassportDto implements IDebtorPassport {
  @IsNumber(
    {},
    {
      message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_NUMBER(property),
    },
  )
  series: number;

  @IsNumber(
    {},
    {
      message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_NUMBER(property),
    },
  )
  number: number;

  @IsString({
    message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_STRING(property),
  })
  departmentCode: string;

  @IsDateString(
    {},
    {
      message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_DATE(property),
    },
  )
  dateOfIssue: Date;

  @IsString({
    message: ({ property }) => DEBTOR_VALIDATE_FIELD_FOR_STRING(property),
  })
  placeOfIssue: string;
}
