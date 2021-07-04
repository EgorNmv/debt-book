import { DebtModel } from 'src/debt/debt.model';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseModel } from '../../common-entities/classes/base.model';
import { IDebtor } from '../interfaces/debtor.interface';
import { DebtorPassportModel } from './debtor-passport.model';

@Entity('debtor')
export class DebtorModel extends BaseModel implements IDebtor {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  patronymic?: string;

  @Column({ nullable: true })
  dateOfBirth?: Date;

  @Column({ nullable: true })
  placeOfBirth?: string;

  @OneToOne(() => DebtorPassportModel, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  passportData?: DebtorPassportModel;

  @Column({ nullable: true })
  trastRaiting?: number;

  @Column({ nullable: true })
  note?: string;

  @Column('text', { array: true, nullable: true })
  images?: string[];

  @OneToMany(() => DebtModel, (debt) => debt.debtor, {
    nullable: true,
  })
  debts?: DebtModel[];
}
