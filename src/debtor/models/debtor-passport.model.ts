import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../common-entities/classes/base.model';
import { IDebtorPassport } from '../interfaces/debtor-passport.interface';

@Entity('debtor_passport')
export class DebtorPassportModel extends BaseModel implements IDebtorPassport {
  @Column()
  series: number;

  @Column()
  number: number;

  @Column()
  dateOfIssue: Date;

  @Column()
  departmentCode: string;

  @Column()
  placeOfIssue: string;
}
