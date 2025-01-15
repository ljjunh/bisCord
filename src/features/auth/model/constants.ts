import { GoogleIcon } from '@/shared/icons/GoogleIcon';
import { KakaoIcon } from '@/shared/icons/KakaoIcon';
import { NaverIcon } from '@/shared/icons/NaverIcon';

// TODO : 소셜로그인 되면 실제 링크 상수에 넣고 import해오기
export const SOCIAL_PROVIDERS = [
  {
    name: 'Google',
    icon: GoogleIcon,
    href: '/',
  },
  {
    name: 'Kakao',
    icon: KakaoIcon,
    href: '/',
  },
  {
    name: 'Naver',
    icon: NaverIcon,
    href: '/',
  },
] as const;

export const AUTH_FORM_STYLES = {
  input: 'w-full rounded border p-2 focus:outline-none',
  label: 'text-super-light-gray mb-2 block text-xs font-bold',
  errorMessage: 'mt-1 text-xs text-red',
} as const;
