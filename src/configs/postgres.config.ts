import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DATABASE'),
    entities: [__dirname + '/../**/*.model{.js, .ts}'],
    migrationsTableName: 'migration',
    migrations: ['src/migration/*.ts'],
    cli: {
      migrationsDir: 'src/migration',
    },
    synchronize: true,
  };
};
