import dayjs from 'dayjs';
/* import ptbr from 'dayjs/locale/pt-br';
 */
export function formatWeekDateTime(value: Date) {
  /* dayjs.locale(ptbr); */
  return dayjs(value).format('HH:mm[h] ddd., D [de] MMM. YYYY');
}

export function formatWeekYear(value: Date) {
  /* dayjs.locale(ptbr); */
  return dayjs(value).format('MMMM [de] YYYY');
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
