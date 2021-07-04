import { DebtModel } from 'src/debt/debt.model';
import { DebtorPassportModel } from '../models/debtor-passport.model';

export interface IDebtor {
  firstName: string;
  lastName: string;
  patronymic?: string;
  dateOfBirth?: Date;
  placeOfBirth?: string;
  passportData?: DebtorPassportModel;
  trastRaiting?: number;
  note?: string;
  images?: string[];
  debts?: DebtModel[];
}
