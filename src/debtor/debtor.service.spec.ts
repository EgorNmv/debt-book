import { Test, TestingModule } from '@nestjs/testing';
import { DebtorService } from './debtor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DebtorModel } from './debtor.model';
import { FindDebtorDto } from './dto/find-debtor.dto';

describe('DebtorService', () => {
  let service: DebtorService;

  const exec = jest.fn();

  const debtorRepositoryFactory = () => ({
    find: (dto: FindDebtorDto) => exec,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebtorService,
        {
          useFactory: debtorRepositoryFactory,
          provide: getRepositoryToken(DebtorModel),
        },
      ],
    }).compile();

    service = module.get<DebtorService>(DebtorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findDebtorByText working', async () => {
    const searchParams: FindDebtorDto = {
      sortOrder: 'ASC',
      text: 'FF',
      limit: 100,
    };

    debtorRepositoryFactory().find(searchParams).mockResolvedValueOnce([]);

    const res = await service.findDebtorByText(searchParams);

    expect(res).toHaveLength(0);
  });
});
