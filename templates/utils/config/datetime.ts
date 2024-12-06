import dayjs, { Dayjs, OpUnitType, QUnitType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const checkValidTimezone = (timezone?: string) => {
  if (!timezone) return false;

  try {
    return !!dayjs.tz(null, timezone);
  } catch (e) {}

  return false;
};

export const convertTimeToUTC = (time: string, timezone: string): Dayjs => {
  const currentDate = dayjs().format('YYYY-MM-DD');
  const utcTime = dayjs.tz(`${currentDate} ${time}`, timezone).utc();
  return utcTime;
};

export const convertDateTimeToUTC = (datetime: string, timezone: string): Dayjs => {
  const utcDateTime = dayjs.tz(datetime, timezone).utc();
  return utcDateTime;
};

export const getNowUTC = () => {
  return dayjs().utc();
};

export const convertStartOfDayToUTC = (dateString: string, timezone: string) => {
  const dateInTimezone = timezone ? dayjs.tz(dateString, timezone) : dayjs.utc(dateString);
  const startOfDayInTimezone = dateInTimezone.startOf('day');
  const startOfDayUTC = startOfDayInTimezone.utc();

  return startOfDayUTC;
};

export const convertEndOfDayToUTC = (dateString: string, timezone: string) => {
  const dateInTimezone = timezone ? dayjs.tz(dateString, timezone) : dayjs.utc(dateString);
  const endOfDayInTimezone = dateInTimezone.endOf('day');
  const endOfDayUTC = endOfDayInTimezone.utc();

  return endOfDayUTC;
};

export const diffTwoTime = (
  start: Date | Dayjs,
  end: Date | Dayjs,
  type?: QUnitType | OpUnitType
) => {
  return dayjs(end).diff(start, type);
};
