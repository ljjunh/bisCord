import { ROUTES } from './routes';

const BASE_URL = 'https://biscords.kro.kr';

export const SEO_CONFIG = {
  ROOT: {
    title: '홈',
    description: 'Biscord에서 친구들과 실시간으로 소통하세요.',
    url: `${BASE_URL}${ROUTES.ROOT}`,
  },
  AUTH: {
    SIGN_IN: {
      title: '로그인',
      description:
        'Biscord에 로그인하고 친구들과 함께 대화를 나누어보세요. 이메일 로그인과 소셜 로그인을 지원합니다.',
      url: `${BASE_URL}${ROUTES.AUTH.SIGN_IN}`,
    },
    SIGN_UP: {
      title: '회원가입',
      description:
        'Biscord의 새로운 멤버가 되어보세요. 간단한 가입으로 친구들과 실시간 대화를 시작할 수 있습니다.',
      url: `${BASE_URL}${ROUTES.AUTH.SIGN_UP}`,
    },
  },
  DIRECT_MESSAGE: {
    title: '다이렉트 메세지',
    description:
      'Biscord에서 친구와 다이렉트 메세지로 소통해보세요. 메시지와 음성채팅을 지원합니다.',
    url: `${BASE_URL}${ROUTES.CHAT.DIRECT_MESSAGE}`,
  },
  SERVER: {
    title: '서버',
    description: 'Biscord의 다양한 서버에서 친구들과 다함께 소통하세요.',
    url: `${BASE_URL}${ROUTES.CHAT.SERVER.ROOT}`,
  },
} as const;
