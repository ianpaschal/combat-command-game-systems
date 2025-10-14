import { SelectOption } from '../types';

export enum CurrencyCode {
  EUR = 'eur', // Euro first as most widely used
  AUD = 'aud',
  CAD = 'cad',
  CHF = 'chf',
  DKK = 'dkk',
  GBP = 'gbp',
  NOK = 'nok',
  NZD = 'nzd',
  SEK = 'sek',
  USD = 'usd',
}

export const getCurrencyOptions: () => SelectOption<CurrencyCode>[] = () => Object.entries(CurrencyCode).map(([key, value]) => ({
  label: key,
  value,
}));
