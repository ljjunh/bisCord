import type { Message, MessageGroups } from '../model/types';

export const groupMessages = (messages: Message[]): MessageGroups[] => {
  return messages.reduce((groups: MessageGroups[], message: Message) => {
    const lastGroup = groups[groups.length - 1];

    // 새 그룹을 시작할지 결정
    const shouldStartNewGroup =
      !lastGroup ||
      lastGroup.user.id !== message.userId ||
      new Date(message.createdAt).getTime() - new Date(lastGroup.timestamp).getTime() >
        1 * 60 * 1000;

    if (shouldStartNewGroup) {
      // 새 그룹 추가
      groups.push({
        user: {
          id: message.userId,
          name: message.name,
          profileImageURL: message.profileImageUrl,
        },
        messages: [message],
        timestamp: message.createdAt,
      });
    } else {
      // 기존 그룹에 메시지 추가
      lastGroup.messages.push(message);
    }

    return groups;
  }, []);
};
