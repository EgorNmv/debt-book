import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateDebtorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  patronymic: string | null;

  @IsDate({ message: 'Дата рождения должна быть датой' })
  dateOfBirth: Date;
}
