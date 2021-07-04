export const DEBTOR_NOT_FOUND = 'Должник с таким id не найден';

export const DEBTOR_VALIDATE_FIELD_FOR_STRING = (fieldName: string) =>
  `Поле ${fieldName} должно быть строкой`;

export const DEBTOR_VALIDATE_FIELD_FOR_NUMBER = (fieldName: string) =>
  `Поле ${fieldName} должно быть числом`;

export const DEBTOR_VALIDATE_FIELD_FOR_DATE = (fieldName: string) =>
  `Поле ${fieldName} должно быть датой`;
