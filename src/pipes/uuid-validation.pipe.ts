import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { UUID_VALIDATION_ERROR } from './pipes.constants';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return value;
    }
    if (!isUUID(value)) {
      throw new BadRequestException(UUID_VALIDATION_ERROR);
    }

    return value;
  }
}
