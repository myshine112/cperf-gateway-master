const config = {
  VERSION: process.env.VERSION,
};

export default config;

export const SERVER_API_URL = process.env.SERVER_API_URL;

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  EMPLOYEE: 'ROLE_EMPLOYEE',
  USER: 'ROLE_USER',
  PROVIDER: 'ROLE_PROVIDER',
  CLIENT: 'ROLE_CLIENT',
  EVALUATOR: 'ROLE_EVALUATOR',
  PROVIDER_VALIDATOR: 'ROLE_PROVIDER_VALIDATOR',
  DEVELOPER: 'ROLE_DEVELOPER',
};

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error',
};

export const APP_DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';
export const APP_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'YYYY-MM-DD';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const APP_LOCAL_DATETIME_FORMAT_Z = 'YYYY-MM-DDTHH:mm Z';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';
export const EMAIL_REGEX_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // eslint-disable-line
export const PHONE_REGEX_PATTERN = /^[\+]?[(]?[0-9]{0,3}[)]?[-\s.]?[0-9]{2,3}[-\s.]?[0-9]{2,3}[-/\s.]?[0-9]{1,2}[-/\s.]?[0-9]{1,2}$/; // eslint-disable-line
