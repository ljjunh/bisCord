export const formatMessageDate = (timestamp: string): string => {
  const messageDate = new Date(timestamp);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDay = new Date(
    messageDate.getFullYear(),
    messageDate.getMonth(),
    messageDate.getDate(),
  );

  const timeStr = messageDate.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
  });

  if (messageDay.getTime() === today.getTime()) {
    return `오늘 ${timeStr}`;
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (messageDay.getTime() === yesterday.getTime()) {
    return `어제 ${timeStr}`;
  }

  return (
    messageDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ` ${timeStr}`
  );
};
