const SOCIAL_BASE_URL = import.meta.env.VITE_SOCIAL_BASE_URL;

export const SOCIAL_PROVIDERS = [
  {
    name: 'Google',
    href: `${SOCIAL_BASE_URL}/google`,
  },
  {
    name: 'Kakao',
    href: `${SOCIAL_BASE_URL}/kakao`,
  },
  {
    name: 'Naver',
    href: `${SOCIAL_BASE_URL}/naver`,
  },
] as const;

export const AUTH_FORM_STYLES = {
  input: 'w-full rounded border p-2 focus:outline-none',
  label: 'text-super-light-gray mb-2 block text-xs font-bold',
  errorMessage: 'mt-1 text-xs text-red',
} as const;
