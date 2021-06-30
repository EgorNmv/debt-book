import { Column, Entity } from 'typeorm';
import { BaseModel } from '../common-entities/base.model';

@Entity('debt')
export class DebtModel extends BaseModel {
  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  notes: string | null;

  @Column()
  originalDebt: number;

  @Column()
  debtRate: number;

  @Column()
  repaymentDate: Date;
}
