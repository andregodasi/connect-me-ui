import dayjs from 'dayjs';

export function formatWeekDateTime(value: Date) {
  return dayjs(value).format('HH:mm[h] ddd., D [de] MMM. YYYY');
}

export function formatWeekYear(value: Date) {
  return dayjs(value).format('MMMM [de] YYYY');
}

export function formatDayWithHours(value: Date) {
  const date = dayjs(value);
  if (date.year() === dayjs().year()) {
    return date.format('D [de] MMMM [às] HH:mm[h]');
  }
  return date.format('D [de] MMMM [de] YYYY [às] HH:mm[h]');
}

export function formatISO8601(value: string) {
  return dayjs(value).toISOString();
}

export function formatInitialDateISO8601(value: string) {
  return dayjs(value)
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
    .toISOString();
}

export function formatFinishDateISO8601(value: string) {
  return dayjs(value)
    .set('hour', 23)
    .set('minute', 59)
    .set('second', 59)
    .toISOString();
}
