export const DEBT_NOT_FOUND = 'Долг с таким id не найден';

export const DEBT_VALIDATE_FIELD_FOR_STRING = (fieldName: string) =>
  `Поле ${fieldName} должно быть строкой`;

export const DEBT_VALIDATE_FIELD_FOR_NUMBER = (fieldName: string) =>
  `Поле ${fieldName} должно быть числом`;

export const DEBT_VALIDATE_FIELD_FOR_DATE = (fieldName: string) =>
  `Поле ${fieldName} должно быть датой`;
