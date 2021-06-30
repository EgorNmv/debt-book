import { Column, Entity } from 'typeorm';
import { BaseModel } from '../common-entities/base.model';

@Entity('auth')
export class UserModel extends BaseModel {
  // @Column({
  //   type: 'citext',
  //   length: 254,
  //   unique: true,
  // })
  @Column({ unique: true })
  email: string;

  @Column({
    type: 'varchar',
    length: 60,
  })
  passwordHash: string;
}
