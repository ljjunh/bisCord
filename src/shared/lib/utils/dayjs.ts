import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import relativeTime from 'dayjs/plugin/relativeTime';

// dayjs 사용을 위한 모듈화

dayjs.locale('ko');
dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export function fromNow(time: string | Date) {
  return dayjs(time).fromNow();
}

export function formatTime(time: string | Date, format = 'YYYY-MM-DD A h:mm') {
  return dayjs(time).format(format);
}

export function formatMessageDate(timestamp: string): string {
  const messageDate = dayjs(timestamp);
  const timeStr = messageDate.format('A h:mm');

  if (messageDate.isToday()) {
    return `오늘 ${timeStr}`;
  }

  if (messageDate.isYesterday()) {
    return `어제 ${timeStr}`;
  }

  return `${messageDate.format('YYYY년 M월 D일')} ${timeStr}`;
}
