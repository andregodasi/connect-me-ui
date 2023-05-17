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
