import { DebtorModel } from 'src/debtor/models/debtor.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../common-entities/classes/base.model';
import { IDebt } from './debt.interface';

@Entity('debt')
export class DebtModel extends BaseModel implements IDebt {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  note?: string;

  @Column({ nullable: true })
  originalAmount?: number;

  @Column({ nullable: true })
  debtAmount?: number;

  @Column({ nullable: true })
  repaymentDate?: Date;

  @ManyToOne(() => DebtorModel, (debtor) => debtor.debts, {
    eager: true,
    nullable: true,
  })
  debtor?: DebtorModel;

  @Column({ nullable: true })
  percent?: number;

  @Column({ nullable: true })
  holder?: string;

  @Column('text', { array: true, nullable: true })
  images?: string[];
}
