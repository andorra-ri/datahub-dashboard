/* eslint-disable import/prefer-default-export */

const DATE_FORMATS = {
  DATETIME_SHORT: { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' },
  FULL_SHORT: { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' },
  '1day': { day: 'numeric', month: 'short', week: 'n' },
};

export const dateFormat = (date, format, locale) => {
  const options = typeof format === 'string' ? DATE_FORMATS[format] : format;
  return Intl.DateTimeFormat(locale, options).format(new Date(date));
};
