import { DebtorModel } from 'src/debtor/models/debtor.model';

export interface IDebt {
  name: string;
  description?: string;
  note?: string;
  originalAmount?: number;
  debtAmount?: number; //после расчета процента
  repaymentDate?: Date;
  debtor?: DebtorModel;
  percent?: number;
  holder?: string;
  images?: string[];
}
