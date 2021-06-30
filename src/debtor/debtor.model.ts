import { Column, Entity } from 'typeorm';
import { BaseModel } from '../common-entities/base.model';

@Entity('debtor')
export class DebtorModel extends BaseModel {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  patronymic: string | null;

  @Column()
  dateOfBirth: Date;
}
